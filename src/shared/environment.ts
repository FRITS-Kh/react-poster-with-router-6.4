import { PostItem } from '../components/Post';

const isDevMode = process.env.NODE_ENV === 'development';
export const serverPath = isDevMode
  ? 'http://127.0.0.1:5001/react-poster-and-router-6/us-central1/app'
  : 'https://us-central1-react-poster-and-router-6.cloudfunctions.net/app';

async function fetchData(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  return await fetch(url, options).catch((error) => {
    console.warn(error);
    return new Response(null, { status: 404 });
  });
}

export async function getPosts(): Promise<PostItem[]> {
  const response = await fetchData(`${serverPath}/posts`);

  if (!response.ok) {
    return [];
  }

  return (await response.json())?.posts ?? [];
}

export async function getPost(postId: string): Promise<PostItem | string> {
  const response = await fetchData(`${serverPath}/posts/${postId}`);

  return response.ok ? (await response.json())?.post : '';
}

export async function addPost(post: PostItem): Promise<void> {
  await fetchData(`${serverPath}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function removePost(postId: string): Promise<void> {
  await fetchData(`${serverPath}/posts/${postId}`, {
    method: 'DELETE',
  });
}
