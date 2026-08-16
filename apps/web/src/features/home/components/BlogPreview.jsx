import { Link } from 'react-router-dom';
import { AsyncGate } from '../../../shared/components/AsyncGate';
import { BlogListItem } from '../../blog/components/BlogListItem';
import { useBlogPosts } from '../../blog/hooks/useBlogPosts';
import { toDisplayPost } from '../../blog/utils/formatPost';

export function BlogPreview() {
  const { posts, loading, error } = useBlogPosts();
  // Map before filter: toDisplayPost assigns tag colors by position in the full list, so a
  // post keeps the same color here as on the full /blog page. Filtering first would rebase
  // each post's index to its position among only the featured ones, changing its color.
  const featuredPosts = (posts ?? [])
    .map((post, index) => toDisplayPost(post, index))
    .filter((post) => post.featured);

  return (
    <section id="blog" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">07 · from the blog</p>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
          From the blog<span className="text-accent">.</span>
        </h2>
        <Link
          to="/blog"
          className="text-sm font-medium whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          All posts →
        </Link>
      </div>
      <div className="flex flex-col">
        <AsyncGate loading={loading} error={error}>
          {featuredPosts.map((post) => (
            <BlogListItem key={post.id} post={post} />
          ))}
        </AsyncGate>
      </div>
    </section>
  );
}
