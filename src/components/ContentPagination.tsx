import { useContext } from 'react';
import { ContentContext } from '../contexts/ContentContext';

const ContentPagination = () => {
  const { currentPage, totalPages, getContents } = useContext(ContentContext);

  return (
    <div className="flex gap-5 mt-5 justify-center items-center">
      <button
        disabled={!(currentPage > 1)}
        onClick={() => getContents(currentPage - 1)}
        className="bg-blue-400 p-2 rounded-2xl cursor-pointer disabled:bg-gray-400 disabled:cursor-alias text-white"
      >
        Anterior
      </button>
      <p className="font-bold">
        {currentPage} de {totalPages}
      </p>
      <button
        disabled={currentPage === totalPages}
        onClick={() => getContents(currentPage + 1)}
        className="bg-blue-400 p-2 rounded-2xl cursor-pointer disabled:bg-gray-400 disabled:cursor-alias text-white"
      >
        Próximo
      </button>
    </div>
  );
};

export default ContentPagination;
