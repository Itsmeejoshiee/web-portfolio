const SIZE_CLASSES = {
  chip: 'px-2.5 py-1 text-[10.5px] tracking-[0.06em]',
  badge: 'px-3 py-[5px] text-[10.5px] tracking-[0.08em]',
  tiny: 'px-[9px] py-[3px] text-[10px] tracking-[0.06em]',
  pill:
    'px-[15px] py-2 text-[11.5px] tracking-[0.06em] shadow-[2px_2px_0_var(--color-ink)] transition-[transform,border-color,color] duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.06] hover:[border-color:var(--tag-hover-border,var(--color-accent))] hover:[color:var(--tag-hover-text,var(--color-accent))]',
};

export function Tag({ children, size = 'chip', bg, fg, hoverBorder, hoverText, className }) {
  const style = {
    '--tag-bg': bg,
    '--tag-fg': fg,
    '--tag-hover-border': hoverBorder,
    '--tag-hover-text': hoverText,
  };

  return (
    <span
      className={`inline-block rounded-full border-[1.5px] border-ink font-mono whitespace-nowrap [background-color:var(--tag-bg,var(--color-white))] [color:var(--tag-fg,var(--color-ink))] ${SIZE_CLASSES[size]} ${className || ''}`}
      style={style}
    >
      {children}
    </span>
  );
}
