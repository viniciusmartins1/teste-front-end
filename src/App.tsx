import Home from '@/pages/Home';
import { ContentContextProvider } from './contexts/ContentContext';

function App() {
  return (
    <ContentContextProvider>
      <div className="w-full flex justify-center relative scroll-smooth">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-16">
          <Home />
        </div>
      </div>
    </ContentContextProvider>
  );
}

export default App;
