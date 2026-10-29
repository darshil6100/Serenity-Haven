// Builds the site and publishes it to S3 + CloudFront, then updates the
// contact-form Lambda. Uses the AWS CLI and your configured credentials.
//
//   npm run deploy:aws               site + Lambda
//   npm run deploy:aws -- --site     site only
//   npm run deploy:aws -- --lambda   Lambda only
//
// Settings live in aws/deploy.config.json. Deploy credentials are read from
// AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY in .env when present, otherwise
// from your normal AWS CLI login.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync('aws/deploy.config.json', 'utf8'));

if (existsSync('.env')) {
  const dotenv = {};
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) dotenv[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  if (dotenv.AWS_ACCESS_KEY_ID && dotenv.AWS_SECRET_ACCESS_KEY) {
    process.env.AWS_ACCESS_KEY_ID = dotenv.AWS_ACCESS_KEY_ID;
    process.env.AWS_SECRET_ACCESS_KEY = dotenv.AWS_SECRET_ACCESS_KEY;
    delete process.env.AWS_PROFILE;
    delete process.env.AWS_SESSION_TOKEN;
  }
}
const args = process.argv.slice(2);
const doSite = !args.includes('--lambda') || args.includes('--site');
const doLambda = !args.includes('--site') || args.includes('--lambda');

// Override when `aws` isn't on PATH for cmd.exe, e.g. a pip/conda install:
//   AWS_CLI="C:\path\to\python.exe -m awscli"
const AWS_CLI = process.env.AWS_CLI || 'aws';

function run(cmd, cmdArgs) {
  const exe = cmd === 'aws' ? AWS_CLI : cmd;
  const line = [exe, ...cmdArgs.map(a => (/[\s,*"]/.test(a) ? `"${a}"` : a))].join(' ');
  console.log(`\n> ${line}`);
  // shell: true so `aws`/`npm` resolve to .cmd shims on Windows.
  const result = spawnSync(line, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    console.error(`\nFailed: ${line}`);
    process.exit(result.status ?? 1);
  }
}

if (doSite && config.distributionId.startsWith('REPLACE')) {
  console.error('Set "distributionId" in aws/deploy.config.json first (CloudFront → your distribution → ID).');
  process.exit(1);
}

if (doSite) {
  const bucket = `s3://${config.bucket}`;
  run('npm', ['run', 'build']);

  // Hashed JS/CSS: cache for a year. Old files are removed with --delete.
  run('aws', ['s3', 'sync', 'dist/assets', `${bucket}/assets`, '--delete',
    '--cache-control', 'public, max-age=31536000, immutable']);
  // Images and other public files: cache for a day.
  run('aws', ['s3', 'sync', 'dist', bucket, '--delete',
    '--exclude', 'assets/*', '--exclude', 'index.html',
    '--cache-control', 'public, max-age=86400']);
  // The page itself: always revalidate so visitors get new deploys immediately.
  run('aws', ['s3', 'cp', 'dist/index.html', `${bucket}/index.html`,
    '--cache-control', 'no-cache', '--content-type', 'text/html; charset=utf-8']);

  run('aws', ['cloudfront', 'create-invalidation', '--distribution-id', config.distributionId,
    '--paths', '/*', '--query', 'Invalidation.Id', '--output', 'text']);
}

if (doLambda) {
  run('npm', ['run', 'build:lambda']);
  run('aws', ['lambda', 'update-function-code', '--function-name', config.lambdaFunction,
    '--zip-file', 'fileb://dist-lambda/serenity-haven-contact.zip',
    '--region', config.region, '--query', 'LastModified', '--output', 'text']);
}

console.log('\nDeployed. Live at https://theserenityhaven.in');
