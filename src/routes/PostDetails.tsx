import {
  useLoaderData,
  Link,
  LoaderFunctionArgs,
  redirect,
  ActionFunctionArgs,
  useSubmit,
} from 'react-router-dom';

import Modal from '../components/Modal';
import { PostItem } from '../components/Post';
import { getPost, removePost } from '../shared/environment';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData() as PostItem;
  const submit = useSubmit();

  function removeClick() {
    submit(
      { 'post-id': post.id },
      {
        method: 'post',
        encType: 'application/x-www-form-urlencoded',
      },
    );
  }

  return (
    <Modal>
      <main className={classes.details}>
        {typeof post === 'string' ? (
          <>
            <h1>
              Could not find <i>{post}</i> post.
            </h1>
            <p>Unfortunately, the requested post could not be found.</p>
            <p>
              <Link to=".." className={classes.back}>
                Okay
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className={classes.author}>{post.author}</h2>
            <p className={classes.text}>{post.body}</p>
            <div className={classes.actions}>
              <button type="button" onClick={removeClick}>
                Remove
              </button>
            </div>
          </>
        )}
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function action({
  request,
}: ActionFunctionArgs): Promise<Response> {
  const formData = await request.formData();
  const postId = formData.get('post-id') as string;

  await removePost(postId);

  return redirect('/');
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<PostItem> {
  return (await getPost(params.postId as string)) ?? params.postId;
}
