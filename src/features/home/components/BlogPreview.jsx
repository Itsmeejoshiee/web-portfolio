import { Link } from 'react-router-dom';
import { BlogListItem } from '../../blog/components/BlogListItem';
import { posts } from '../../blog/data/posts';

const featuredPosts = posts.filter((post) => post.featured);

export function BlogPreview() {
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
        {featuredPosts.map((post) => (
          <BlogListItem key={post.id} post={post} href="#blog" />
        ))}
      </div>
    </section>
  );
}
