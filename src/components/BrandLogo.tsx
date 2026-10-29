import serenityIcon from '../assets/serenity-haven-icon.png';

type BrandLogoProps = {
  size?: 'md' | 'lg';
  showTagline?: boolean;
};

// Emblem + live wordmark. Rendering the name as text (instead of the old
// raster logo) keeps it crisp and readable on the dark header and footer.
export default function BrandLogo({ size = 'md', showTagline = false }: BrandLogoProps) {
  const lg = size === 'lg';

  return (
    <span className="flex items-center gap-3 select-none">
      <img
        src={serenityIcon}
        alt=""
        width={178}
        height={164}
        className={`${lg ? 'h-16 sm:h-[4.5rem]' : 'h-11 sm:h-12'} w-auto drop-shadow-[0_2px_10px_rgba(201,169,110,0.25)]`}
      />
      <span className="flex flex-col items-start leading-none border-l border-[#c9a96e]/35 pl-3">
        <span className={`${lg ? 'text-[0.62rem]' : 'text-[0.55rem]'} font-medium tracking-[0.5em] text-[#d9bc85] uppercase`}>
          The
        </span>
        <span
          className={`${lg ? 'text-[2rem]' : 'text-[1.45rem] sm:text-[1.6rem]'} font-medium tracking-[0.06em] text-[#faf3e3] uppercase my-[3px]`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Serenity
        </span>
        <span className={`${lg ? 'text-[0.62rem]' : 'text-[0.55rem]'} font-medium tracking-[0.62em] text-[#d9bc85] uppercase`}>
          Haven
        </span>
        {showTagline && (
          <span className="mt-2 text-[0.55rem] tracking-[0.28em] text-[#a8c4a0] uppercase">
            Heal · Reconnect · Renew
          </span>
        )}
      </span>
    </span>
  );
}
