import type { Content, ContentResponse } from '@/models/content';
import imgDefault from '@/assets/imageDefault.png';

const ONE_MINUTE_IN_SECONDS = 60;
const ONE = 1;

export const contentListAdapter = (content: ContentResponse): Content => {
  return {
    id: content.id,
    title: content.title,
    contentType: content.type,
    category: content.category,
    duration: `${content.durationSeconds < ONE_MINUTE_IN_SECONDS ? ONE : content.durationSeconds / 60}min`,
    thumbnailUrl: content.thumbnailUrl || imgDefault,
  };
};
