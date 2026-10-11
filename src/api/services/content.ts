import { api } from '@/api/index';
import type {
  ContentDetailsResponse,
  ContentPaginationResponse,
  ContentRequestParams,
  Pagination,
} from '@/models/content';

export const getAllContents = async (params?: ContentRequestParams) => {
  const response = await api.get<ContentPaginationResponse & Pagination>('/contents', {
    params: {
      search: params?.search || '',
      category: params?.category || '',
      page: params?.page || 1,
      limit: params?.limit,
    },
  });

  return response;
};

export const getContentById = async (contentId: number) => {
  const response = await api.get<ContentDetailsResponse>(`/contents/${contentId}`);

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
  const response = await api.delete(`/favorites/${contentId}`);

  return response;
};
