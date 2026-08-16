import { AsyncGate } from '../../shared/components/AsyncGate';
import { PageHeader } from '../../shared/components/PageHeader';
import { useSiteSection } from '../../shared/hooks/useSiteSection';
import { BlogListItem } from './components/BlogListItem';
import { useBlogPosts } from './hooks/useBlogPosts';
import { toDisplayPost } from './utils/formatPost';

const FALLBACK_INTRO = 'Intro line placeholder — notes on building for the web, freelancing, and community.';

export function BlogPage() {
  const section = useSiteSection('blog-header');
  const { posts, loading, error } = useBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="writing"
        title="The blog"
        badge="synced from notion …"
        intro={section?.body ?? FALLBACK_INTRO}
      />
      <section className="mx-auto flex max-w-[1160px] flex-col px-6 pt-12 pb-24">
        <AsyncGate loading={loading} error={error}>
          {posts?.length === 0 && <p className="py-12 text-center text-sm text-muted">No posts yet.</p>}
          {posts?.map((post, index) => <BlogListItem key={post.id} post={toDisplayPost(post, index)} />)}
        </AsyncGate>
      </section>
    </>
  );
}
