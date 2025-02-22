import { useSuspenseQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';

import { Post } from '../Post/Post';
import { Pagination } from '../Pagination/Pagination';

import './Posts.css';

interface PostsProps {
  showNav: boolean;
  pageSize: number;
  maxPages: number;
}

export const Posts = ({ showNav, pageSize, maxPages }: PostsProps) => {
  const [page, setPage] = useState(1);
  const postsRef = useRef<HTMLDivElement>(null);

  const { data: posts, isError, error } = useSuspenseQuery<Post[]>({
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    postsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="posts-container">
      <div className='posts' ref={postsRef}>
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      {showNav && <Pagination currentPage={page} maxPages={maxPages} onPageChange={handlePageChange} />}
    </div>
  );
};
