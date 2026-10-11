import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import imgNotFound from '@/assets/404.png';
import { LoadingContext } from '@/contexts/LoadingContext';
import { ClipLoader } from 'react-spinners';
import { ContentContext } from '@/contexts/ContentContext';

const ContentDetail = () => {
  const { loading } = useContext(LoadingContext);
  const {
    contentSelected: content,
    getContent,
    markAsFavorite,
    unmarkAsFavorite,
  } = useContext(ContentContext);

  const { id: contentId } = useParams();

  useEffect(() => {
    getContent(Number(contentId));
  }, []);

  if (loading) {
    return (
      <div className="flex mt-5 justify-center">
        <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="my-10 py-10 flex flex-col items-center text-center">
        <p className="text-2xl font-bold">Conteúdo não encontrado</p>
        <img className="w-fit" src={imgNotFound} alt="Conteúdo não encontrado" />
      </div>
    );
  }

  return (
    !!content && (
      <div className="flex gap-5 my-10 py-10">
        <img
          src={content?.thumbnailUrl}
          alt={content?.title}
          className="w-lg h-90 object-cover rounded-3xl"
        />
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-3xl mt-2">{content?.title}</h3>
          <p className="text-lg">{content?.description}</p>
          <p>Instrutor(a): {content?.instructor}</p>

          <div className="flex gap-6 text-xl mt-5 ">
            <p>{content?.category}</p>
            <p>{content?.contentType}</p>
            <p>{content?.duration}</p>
          </div>

          <div className="flex-1">
            {content?.isFavorite && (
              <p className="text-yellow-500 font-semibold text-xl mt-3">Favorito</p>
            )}
          </div>

          <button
            className="rounded-4xl px-3 py-2 border w-fit cursor-pointer"
            onClick={() => {
              content.isFavorite ? unmarkAsFavorite(content.id) : markAsFavorite(content.id);
            }}
          >
            {content?.isFavorite ? 'Desfavoritar' : 'Marcar como Favorito'}
          </button>
        </div>
      </div>
    )
  );
};

export default ContentDetail;
