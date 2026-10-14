import { ContentContextProvider } from '@/contexts/ContentContext';
import TemplatePage from '@/shared/TemplatePage';
import { RouterProvider } from 'react-router/dom';
import { routes } from './Routes';
import { LoadingContextProvider } from './contexts/LoadingContext';

function App() {
  return (
    <LoadingContextProvider>
      <ContentContextProvider>
        <TemplatePage>
          <RouterProvider router={routes} />
        </TemplatePage>
      </ContentContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
