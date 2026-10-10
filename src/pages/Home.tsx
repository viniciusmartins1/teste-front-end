import ContentFilter from '@/components/ContentFilter';
import { useContext, useEffect } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import ContentList from '@/components/ContentList';
import ContentPagination from '@/components/ContentPagination';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const { contents, getContents, totalPages, loading } = useContext(ContentContext);

  useEffect(() => {
    getContents();
  }, []);

  return (
    <div className="pt-12 pb-12">
      <h2 className="text-3xl pb-3">Catálogo de Produtos</h2>
      <ContentFilter />

      {!loading && (
        <section className="flex flex-col">
          <ContentList contents={contents} />
          {!!(totalPages > 1) && <ContentPagination />}
        </section>
      )}

      <div className="flex gap-5 mt-5 justify-center items-center">
        <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading" />
      </div>
    </div>
  );
};

export default Home;
