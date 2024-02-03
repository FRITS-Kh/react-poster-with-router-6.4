import { useMemo } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

import { PostItem } from '../components/Post';
import PostsList from '../components/PostsList';
import { getPosts } from '../shared/environment';

function Posts() {
  const posts = useLoaderData() as PostItem[];
  const postsListElement = useMemo(() => <PostsList posts={posts} />, [posts]);

  return (
    <>
      <Outlet />
      <main>{postsListElement}</main>
    </>
  );
}

export default Posts;

export async function loader(): Promise<PostItem[]> {
  return getPosts();
}
