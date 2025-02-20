import './Post.css';
import './PostSkeleton.css';

export const PostSkeleton = () => {
  return (
    <div className='post skeleton'>
      <h2 className='skeleton-title' />
      <p className='skeleton-body' />
      <div className='skeleton-footer' />
    </div>
  );
};
