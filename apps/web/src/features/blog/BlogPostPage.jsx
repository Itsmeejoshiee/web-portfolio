import { useParams } from 'react-router-dom';
import { AsyncGate } from '../../shared/components/AsyncGate';
import { Tag } from '../../shared/components/Tag';
import { useBlogPost } from './hooks/useBlogPost';
import { formatPostDate } from './utils/formatPost';

export function BlogPostPage() {
  const { id } = useParams();
  const { post, loading, error } = useBlogPost(id);

  return (
    <AsyncGate loading={loading} error={error} errorLabel="Couldn't find that post.">
      {post && (
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
          <div className="flex flex-col gap-5 text-base leading-relaxed text-ink">
            {(post.content ?? '').split(/\n{2,}/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      )}
    </AsyncGate>
  );
}
