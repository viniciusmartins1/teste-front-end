import type { Content } from '@/models/content';
import ContentCard from '@/components/ContentCard';

type ContentListProps = {
  contents: Array<Content>;
};

const ContentList = ({ contents }: ContentListProps) => {
  return (
    <div className="grid grid-cols-2 flex-wrap p-10 gap-4">
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
  );
};
export default ContentList;
