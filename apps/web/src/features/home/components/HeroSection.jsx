import { BlobCluster, HeroButtonsAccent, HeroNameAccent } from '../../../shared/components/BlobCluster';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { useHeroTypewriter } from '../hooks/useHeroTypewriter';

export function HeroSection() {
  const { text, font, caretColor, caretAnim, accent, accentTint, swatchC, swatchD } = useHeroTypewriter();
  const isMobile = useIsMobile();

  return (
    <header id="hero" className="relative flex min-h-[calc(92vh-64px)] items-center overflow-hidden">
      {isMobile ? null : (
        <BlobCluster placement="hero" accent={accent} accentTint={accentTint} swatchC={swatchC} swatchD={swatchD} />
      )}
      <div className="relative mx-auto w-full max-w-[1160px] px-6 py-[72px]">
        <h1
          className="m-0 flex min-h-[clamp(80px,14vw,190px)] items-center text-[clamp(56px,12vw,160px)] leading-[1.05] font-semibold tracking-[-0.02em] text-ink"
          style={{ fontFamily: font }}
        >
          <span>{text}</span>
          <span
            aria-hidden="true"
            className="ml-[0.06em] inline-block h-[0.82em] w-[0.06em] rounded-full transition-[background] duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ background: caretColor, animation: caretAnim }}
          />
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-[clamp(28px,5vw,64px)] leading-[1.1] font-semibold tracking-[-0.02em] text-ink">
            it's me,{' '}
            <span className="inline-block -rotate-3 text-accent transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:rotate-3 hover:scale-[1.06]">
              Josh
            </span>
            !
          </p>
          {isMobile ? (
            <HeroNameAccent accent={accent} accentTint={accentTint} swatchC={swatchC} swatchD={swatchD} />
          ) : null}
        </div>
        <p className="my-6 max-w-[520px] text-base text-muted">
          [One short line of hero copy — who Josh helps and how his sites feel. ~90 characters.]
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-block rounded-full border-2 border-ink bg-accent px-[30px] py-[14px] text-[15px] font-semibold text-paper shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:text-paper active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            see my work
          </a>
          <a
            href="uploads/resume.pdf"
            download="Josh-Gorospe-Resume.pdf"
            className="inline-block rounded-full border-2 border-ink bg-periwinkle px-[30px] py-[14px] text-[15px] font-semibold text-paper shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:text-paper active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-periwinkle"
          >
            grab my resume
          </a>
          {isMobile ? (
            <HeroButtonsAccent accent={accent} accentTint={accentTint} swatchC={swatchC} swatchD={swatchD} />
          ) : null}
        </div>
      </div>
    </header>
  );
}
