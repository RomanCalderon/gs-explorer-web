import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';

import { Post } from '../Post/Post';

import './Posts.css';

interface PostsProps {
  showNav: boolean;
}

export const Posts = ({ showNav }: PostsProps) => {
  const [page, setPage] = useState(1);
  const pageSize: number = 10;
  const maxPages: number = 10;
  const postsRef = useRef<HTMLDivElement>(null);

  const { data: posts, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: [`posts/v1?page=${page}&pageSize=${pageSize}`],
  });

  useEffect(() => {
    if (!posts || !postsRef.current) return;

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
  }, [posts]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const nextPage = () => setPage(Math.min(page + 1, maxPages));
  const prevPage = () => setPage(Math.max(page - 1, 1));

  const postsNav = (
    <div className='posts-nav'>
      <button onClick={prevPage} disabled={page === 1}>
        Prev
      </button>
      <span className="page-number">{page}</span>
      <button onClick={nextPage} disabled={page >= maxPages}>
        Next
      </button>
    </div>
  );

  return (
    <div className="posts-container">
      {showNav && postsNav}
      <div className='posts' ref={postsRef}>
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      {showNav && postsNav}
    </div>
  );
};
