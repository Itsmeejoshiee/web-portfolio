import { Link } from 'react-router-dom';
import { Tag } from '../../../shared/components/Tag';

export function BlogListItem({ post }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="flex flex-col gap-1.5 border-t border-border px-2 py-[22px] text-ink transition-colors duration-200 last:border-b hover:bg-[rgba(216,90,48,0.04)] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-5"
    >
      <div className="flex items-baseline gap-3 sm:flex-1">
        <span className="w-[88px] flex-none font-mono text-[11px] tracking-[0.06em] text-faint">{post.date}</span>
        <span className="font-display flex-[1_1_280px] text-xl font-semibold">{post.title}</span>
      </div>
      <div className="flex flex-none items-center gap-3">
        <span className="flex-none font-mono text-[11px] text-faint">{post.readTime}</span>
        <Tag bg={post.tag.bg} fg={post.tag.fg}>
          {post.tag.label}
        </Tag>
      </div>
    </Link>
  );
}
