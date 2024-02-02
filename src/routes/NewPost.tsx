import {
  Link,
  Form,
  redirect,
  ActionFunctionArgs,
  useNavigate,
} from 'react-router-dom';

import { PostItem } from '../components/Post';
import Modal from '../components/Modal';
import classes from './NewPost.module.css';
import { addPost } from '../shared/environment';

function NewPost() {
  const navigate = useNavigate();

  // to prevent rendering Modal after submit
  function formSubmit() {
    navigate('..');
  }

  return (
    <Modal withCloseButton={false}>
      <Form className={classes.form} method="post" onSubmit={formSubmit}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" rows={3} required></textarea>
        </p>
        <p>
          <label htmlFor="name">Author name</label>
          <input id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({
  request,
}: ActionFunctionArgs): Promise<Response> {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData) as unknown as PostItem;

  await addPost(postData);

  return redirect('/');
}
