import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './RootLayout.tsx';
import Posts, { loader as postLoader } from './Posts.tsx';
import NewPost, { action as newPostAction } from './NewPost.tsx';
import PostDetails, {
  loader as postDetailsLoader,
  action as postDetailsAction,
} from './PostDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postLoader,
        children: [
          { path: 'create-post', element: <NewPost />, action: newPostAction },
          {
            path: ':postId',
            element: <PostDetails />,
            action: postDetailsAction,
            loader: postDetailsLoader,
          },
        ],
      },
    ],
  },
]);
