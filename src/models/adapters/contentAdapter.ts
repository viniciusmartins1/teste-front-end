import type { Content, ContentResponse } from '@/models/content';
import imgDefault from '@/assets/imageDefault.png';
import { capitalizeFirstLetter, formatterDuration } from '@/helpers/formatter';

export const contentListAdapter = (content: ContentResponse): Content => {
  return {
    id: content.id,
    title: content.title,
    contentType: capitalizeFirstLetter(content.type),
    category: capitalizeFirstLetter(content.category),
    duration: formatterDuration(content.durationSeconds),
    thumbnailUrl: content.thumbnailUrl || imgDefault,
  };
};
