import './Posts.css';
import '../Post/Post.css';
import { PostSkeleton } from '../Post/PostSkeleton';

interface PostsSkeletonProps {
  count: number;
}

export const PostsSkeleton = ({ count }: PostsSkeletonProps) => {
  const postsNav = (
    <div className='posts-nav'>
      <button disabled>
        Prev
      </button>
      <span className="page-number">...</span>
      <button disabled>
        Next
      </button>
    </div>
  );

  return (
    <>
      {postsNav}
      <div className='posts'>
        {[...Array(count)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
      {postsNav}
    </>
  );
};