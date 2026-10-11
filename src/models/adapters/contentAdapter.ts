import type {
  Content,
  ContentDetails,
  ContentDetailsResponse,
  ContentResponse,
} from '@/models/content';
import imgDefault from '@/assets/imageDefault.png';
import {
  capitalizeFirstLetter,
  formatterDate,
  formatterDuration,
  formatterTitleLength,
} from '@/helpers/formatter';

export const contentListAdapter = (content: ContentResponse): Content => {
  return {
    id: content.id,
    title: formatterTitleLength(content.title),
    contentType: capitalizeFirstLetter(content.type),
    category: capitalizeFirstLetter(content.category),
    duration: formatterDuration(content.durationSeconds),
    thumbnailUrl: content.thumbnailUrl || imgDefault,
  };
};

export const contentDetailsAdapter = (content: ContentDetailsResponse): ContentDetails => {
  return {
    id: content.id,
    title: content.title,
    contentType: capitalizeFirstLetter(content.type),
    category: capitalizeFirstLetter(content.category),
    duration: formatterDuration(content.durationSeconds),
    thumbnailUrl: content.thumbnailUrl || imgDefault,
    description: content.description,
    instructor: content.instructor,
    isFavorite: content.isFavorite,
    publishedAt: formatterDate(content.publishedAt),
  };
};
