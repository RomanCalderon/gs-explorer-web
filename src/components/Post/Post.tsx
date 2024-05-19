import './Post.css';

export interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const Post = (post: PostType) => {
  if (!post) return <p>Loading...</p>;
  return (
    <div className='post'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div className='read-the-docs'>{post.id}</div>
    </div>
  );
};
