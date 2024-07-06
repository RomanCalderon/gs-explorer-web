import { useState } from 'react';

import usePaginatedPosts from '../../hooks/usePaginatedPosts';
import { Post } from '../Post/Post';
import './Posts.css';

interface PostsProps {
  showNav: boolean;
}

export const Posts = ({ showNav }: PostsProps) => {
  const pageSize: number = 10;
  const maxPages: number = 10;

  const [page, setPage] = useState(1);
  const [posts] = usePaginatedPosts(page, pageSize);
  
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

  if (!posts) return <p>Loading...</p>;

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
