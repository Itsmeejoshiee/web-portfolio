import { Tag } from '../../../shared/components/Tag';
import { formatPostDate } from '../utils/formatPost';

// Shared by the public post page and the admin editor's live preview, so what an
// author sees while writing is exactly what ships — same markup, same styles.
export function PostBody({ post }) {
  return (
    <article className="mx-auto max-w-[720px] px-6 pt-[88px] pb-24">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{formatPostDate(post.date)}</span>
        <Tag>{post.tag}</Tag>
        <span className="font-mono text-[11px] text-faint">{post.readTimeMinutes} min read</span>
      </div>
      <h1 className="font-display mb-10 text-[clamp(36px,6vw,56px)] leading-[1.1] font-semibold tracking-[-0.02em]">
        {post.title}
        <span className="text-accent">.</span>
      </h1>
      <div
        className="prose flex flex-col gap-5 text-base leading-relaxed text-ink"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />
    </article>
  );
}
