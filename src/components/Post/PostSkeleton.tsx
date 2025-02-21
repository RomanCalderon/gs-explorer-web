import './Post.css';
import './PostSkeleton.css';

interface PostSkeletonProps {
  minHeight: number;
  maxHeight: number;
}

export const PostSkeleton = ({ minHeight = 100, maxHeight = 300 }: PostSkeletonProps) => {
  const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
  return (
    <div className='post skeleton'>
      <h2 className='skeleton-title' />
      <p className='skeleton-body' style={{ height: `${randomHeight}px` }} />
      <div className='skeleton-footer' />
    </div>
  );
};
