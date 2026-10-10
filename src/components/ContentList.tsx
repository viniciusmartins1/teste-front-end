import type { Content } from '@/models/content';
import ContentCard from '@/components/ContentCard';

type ContentListProps = {
  contents: Array<Content>;
};

const ContentList = ({ contents }: ContentListProps) => {
  return !!contents.length ? (
    <div className="grid grid-cols-2 flex-wrap pt-10 pb-5 gap-4">
      {contents.map((content) => {
        return (
          <ContentCard
            key={content.id}
            title={content.title}
            duration={content.duration}
            thumbnailUrl={content.thumbnailUrl}
            contentType={content.contentType}
            category={content.category}
          />
        );
      })}
    </div>
  ) : (
    <div className="text-justify py-10">
      <p className="text-lg">Nenhum dado disponível no momento ou para o filtro selecionado!</p>
    </div>
  );
};
export default ContentList;
