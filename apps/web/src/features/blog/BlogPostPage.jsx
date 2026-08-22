import { useParams } from 'react-router-dom';
import { AsyncGate } from '../../shared/components/AsyncGate';
import { PostBody } from './components/PostBody';
import { useBlogPost } from './hooks/useBlogPost';

export function BlogPostPage() {
  const { id } = useParams();
  const { post, loading, error } = useBlogPost(id);

  return (
    <AsyncGate loading={loading} error={error} errorLabel="Couldn't find that post.">
      {post && <PostBody post={post} />}
    </AsyncGate>
  );
}
