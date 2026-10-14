import Home from '@/pages/Home';
import ContentDetail from '@/pages/ContentDetail';
import { createBrowserRouter } from 'react-router';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/content/:id',
    element: <ContentDetail />,
  },
]);
