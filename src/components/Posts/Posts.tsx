import { useState, useEffect } from 'react';

import { PostType, Post } from '../Post/Post';

import './Posts.css';

interface PostsProps {
  showNav: boolean;
}

export const Posts = ({ showNav }: PostsProps) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const perPage: number = 10;
  const maxPages: number = 10;

  const nextPage = () => setPage(Math.min(page + 1, maxPages));
  const prevPage = () => setPage(Math.max(page - 1, 1));

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_per_page=${perPage}`);
      const postsJson = await response.json();
      setPosts(postsJson);
    };

    getPosts();
  }, [page]);

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
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      {showNav && postsNav}
    </div>
  );
};
