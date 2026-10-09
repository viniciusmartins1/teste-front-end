type ContentProps = {
  title: string;
  thumbnailUrl: string;
  category: string;
  contentType: string;
  duration: string;
};

const ContentCard = ({ title, thumbnailUrl, category, duration, contentType }: ContentProps) => {
  return (
    <div>
      <div className="flex border-3 rounded-2xl border-gray-300  h-40 overflow-hidden">
        <img src={thumbnailUrl} alt={title} className="w-37.5  object-cover" />
        <div className="p-3.5 flex flex-col gap-5  justify-center">
          <h3 className="text-[18px] font-bold ">{title}</h3>
          <div className="flex gap-5">
            <p>{category}</p>
            <p>{contentType}</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
