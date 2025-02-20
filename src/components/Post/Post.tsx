import './Post.css';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const Post = (post: Post) => {
  if (!post) return <p>Loading...</p>;
  return (
    <div className='post'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div className='post-footer'>
        User ID: {post.userId}
      </div>
    </div>
  );
};
