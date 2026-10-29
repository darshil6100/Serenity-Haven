// Bundles aws/lambda.ts into a single ESM file and zips it for Lambda.
//   npm run build:lambda  →  dist-lambda/serenity-haven-contact.zip
import { build } from 'esbuild';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { crc32, deflateRawSync } from 'node:zlib';

const OUT_DIR = 'dist-lambda';
const ZIP_PATH = `${OUT_DIR}/serenity-haven-contact.zip`;

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

await build({
  entryPoints: ['aws/lambda.ts'],
  outfile: `${OUT_DIR}/index.mjs`,
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  minify: false,
  legalComments: 'none',
});

// Minimal single-file .zip writer (Lambda accepts standard deflate zips),
// so no zip tool is needed on Windows/macOS/Linux.
function zipSingleFile(name, data) {
  const nameBuf = Buffer.from(name);
  const compressed = deflateRawSync(data);
  const crc = crc32(data) >>> 0;

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);           // version needed
  local.writeUInt16LE(0, 6);            // flags
  local.writeUInt16LE(8, 8);            // deflate
  local.writeUInt32LE(0, 10);           // mod time/date
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(compressed.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(0x0314, 4);     // made by: Unix, v2.0
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0, 8);
  central.writeUInt16LE(8, 10);
  central.writeUInt32LE(0, 12);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(compressed.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(nameBuf.length, 28);
  central.writeUInt32LE(0, 30);         // extra, comment, disk start
  central.writeUInt16LE(0, 34);
  central.writeUInt16LE(0, 36);         // internal attrs
  central.writeUInt32LE((0o100644 << 16) >>> 0, 38); // -rw-r--r--
  central.writeUInt32LE(0, 42);         // local header offset

  const localSize = local.length + nameBuf.length + compressed.length;
  const centralSize = central.length + nameBuf.length;
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(1, 8);
  end.writeUInt16LE(1, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(localSize, 16);

  return Buffer.concat([local, nameBuf, compressed, central, nameBuf, end]);
}

writeFileSync(ZIP_PATH, zipSingleFile('index.mjs', readFileSync(`${OUT_DIR}/index.mjs`)));
console.log(`Lambda package ready: ${ZIP_PATH}`);
