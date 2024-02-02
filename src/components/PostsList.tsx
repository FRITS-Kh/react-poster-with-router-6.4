import { useMemo } from 'react';

import Post, { PostItem } from './Post';
import classes from './PostsList.module.css';

export interface PostsListProps {
  posts: PostItem[];
}

function PostsList({ posts }: PostsListProps) {
  const postElements = useMemo(
    () => posts.map((post) => <Post key={post.id + post.body} post={post} />),
    [posts],
  );

  return (
    <section className={classes.posts}>
      {posts.length > 0 ? (
        postElements
      ) : (
        <div className={classes.empty}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </section>
  );
}

export default PostsList;
