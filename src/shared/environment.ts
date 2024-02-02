import { PostItem } from '../components/Post';

export const serverPath = 'http://localhost:8080';

export async function getPosts(): Promise<PostItem[]> {
  const response = await fetch(`${serverPath}/posts`);
  const data = await response.json();

  return data.posts;
}

export async function getPost(postId: string): Promise<PostItem> {
  const response = await fetch(`${serverPath}/posts/${postId}`);
  const resData = await response.json();

  return resData.post;
}

export async function addPost(post: PostItem): Promise<void> {
  await fetch(`${serverPath}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function removePost(postId: string): Promise<void> {
  await fetch(`${serverPath}/posts/${postId}`, {
    method: 'DELETE',
  });
}
