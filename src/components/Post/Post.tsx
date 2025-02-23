import { getTimeAgo } from '../../utils/dateTimeUtils';
import './Post.css';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Post = (post: Post) => {
  if (!post) return <p>Loading...</p>;

  const createdAt = new Date(post.createdAt);
  const timeAgo = getTimeAgo(createdAt);
  const formattedDate = createdAt.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className='post'>
      <h2>{post.title}</h2>
      <div className='user-id'>User {post.userId}</div>
      <p>{post.summary}</p>
      <div className='post-footer'>
        <div id='time-ago' className='time-ago' title={formattedDate}>{timeAgo}</div>
      </div>
    </div>
  );
};
