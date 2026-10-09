import type { Content, ContentResponse } from '@/models/content';
import imgDefault from '@/assets/imageDefault.png';

export const contentListAdapter = (content: ContentResponse): Content => {
  return {
    id: content.id,
    title: content.title,
    contentType: content.type,
    category: content.category,
    duration: `${content.durationSeconds / 60}min`,
    thumbnailUrl: content.thumbnailUrl || imgDefault,
  };
};
