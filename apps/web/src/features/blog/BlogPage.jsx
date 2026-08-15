import { PageHeader } from '../../shared/components/PageHeader';
import { BlogListItem } from './components/BlogListItem';
import { posts } from './data/posts';

export function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="writing"
        title="The blog"
        badge="synced from notion …"
        intro="[Intro line placeholder — notes on building for the web, freelancing, and community.]"
      />
      <section className="mx-auto flex max-w-[1160px] flex-col px-6 pt-12 pb-24">
        {posts.map((post) => (
          <BlogListItem key={post.id} post={post} />
        ))}
      </section>
    </>
  );
}
