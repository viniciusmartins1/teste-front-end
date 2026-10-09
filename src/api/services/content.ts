import { api } from '@/api/index';
import type { ContentPaginationResponse, ContentResponse } from '@/models/content';

export const getAllContents = async () => {
  const response = await api.get<ContentPaginationResponse>('/contents');

  return response;
};

export const getContentById = async (contentId: number) => {
  const response = await api.get<ContentResponse>(`/contents/${contentId}`);

  return response;
};

export const getAllFavorites = async () => {
  const response = await api.get<ContentPaginationResponse>(`/favorites`);

  return response;
};

export const markAsFavorite = async (contentId: number) => {
  const response = await api.post(`/favorites`, {
    contentId,
  });

  return response;
};

export const unmarkAsFavorite = async (contentId: number) => {
  const response = await api.post(`/favorites/${contentId}`);

  return response;
};
