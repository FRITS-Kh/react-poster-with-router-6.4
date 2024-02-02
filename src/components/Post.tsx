import { Link } from 'react-router-dom';

import classes from './Post.module.css';

export interface PostItem {
  id: string;
  author: string;
  body: string;
}

export interface PostProps {
  post: PostItem;
}

function Post({ post }: PostProps) {
  return (
    <article className={classes.post}>
      <Link to={post.id} className={classes.link}>
        <h2 className={classes.author}>{post.author}</h2>
        <p className={classes.text}>{post.body}</p>
      </Link>
    </article>
  );
}

export default Post;
