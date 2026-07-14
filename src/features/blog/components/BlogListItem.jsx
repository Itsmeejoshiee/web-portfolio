import { Tag } from '../../../shared/components/Tag';

export function BlogListItem({ post, href = '#' }) {
  return (
    <a
      href={href}
      className="flex flex-wrap items-baseline gap-5 border-t border-border px-2 py-[22px] text-ink transition-colors duration-200 last:border-b hover:bg-[rgba(216,90,48,0.04)] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="w-[88px] flex-none font-mono text-[11px] tracking-[0.06em] text-faint">{post.date}</span>
      <span className="font-display flex-[1_1_280px] text-xl font-semibold">{post.title}</span>
      <span className="flex-none font-mono text-[11px] text-faint">{post.readTime}</span>
      <Tag bg={post.tag.bg} fg={post.tag.fg}>
        {post.tag.label}
      </Tag>
    </a>
  );
}
