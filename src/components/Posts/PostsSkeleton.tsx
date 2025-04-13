import { useEffect, useRef } from 'react';
import './Posts.css';
import '../Post/Post.css';
import { PostSkeleton } from '../Post/PostSkeleton';

interface PostsSkeletonProps {
  count: number;
}

export const PostsSkeleton = ({ count }: PostsSkeletonProps) => {
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!postsRef.current) return;

    const resizeGridItems = () => {
      const grid = postsRef.current;
      if (!grid) return;

      const items = grid.getElementsByClassName('post');
      for (let i = 0; i < items.length; i++) {
        const rowHeight = 20;
        const rowSpan = Math.ceil(items[i].getBoundingClientRect().height / rowHeight);
        (items[i] as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
      }
    };

    resizeGridItems();

    const timeoutId = setTimeout(resizeGridItems, 100);

    window.addEventListener('resize', resizeGridItems);

    return () => {
      window.removeEventListener('resize', resizeGridItems);
      clearTimeout(timeoutId);
    };
  }, [count]);

  return (
    <>
      <div className='posts' ref={postsRef}>
        {[...Array(count)].map((_, i) => (
          <PostSkeleton key={i} minHeight={100} maxHeight={200} />
        ))}
      </div>
      <div className='posts-nav'>
        <button disabled>
          Prev
        </button>
        <span className="page-number">...</span>
        <button disabled>
          Next
        </button>
      </div>
    </>
  );
};
