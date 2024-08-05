import { useState } from 'react';

import { Post } from '../Post/Post';
import './Posts.css';
import { useQuery } from '@tanstack/react-query';

interface PostsProps {
  showNav: boolean;
}

export const Posts = ({ showNav }: PostsProps) => {
  const [page, setPage] = useState(1);
  const pageSize: number = 10;
  const maxPages: number = 10;

  const { data: posts, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: [`posts/v1?page=${page}&pageSize=${pageSize}`],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const nextPage = () => setPage(Math.min(page + 1, maxPages));
  const prevPage = () => setPage(Math.max(page - 1, 1));

  const postsNav = (
    <div className='posts-nav'>
      <button onClick={prevPage} disabled={page === 1}>
        Prev
      </button>
      {page}
      <button onClick={nextPage} disabled={page >= maxPages}>
        Next
      </button>
    </div>
  );

  return (
    <div>
      {showNav && postsNav}
      <div className='posts'>
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      {showNav && postsNav}
    </div>
  );
};
