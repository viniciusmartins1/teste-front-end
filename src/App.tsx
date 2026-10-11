import { ContentContextProvider } from '@/contexts/ContentContext';
import TemplatePage from '@/shared/TemplatePage';
import { RouterProvider } from 'react-router/dom';
import { routers } from './Routes';
import { LoadingContextProvider } from './contexts/LoadingContext';

function App() {
  return (
    <LoadingContextProvider>
      <ContentContextProvider>
        <TemplatePage>
          <RouterProvider router={routers} />
        </TemplatePage>
      </ContentContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
