import { api } from '@/api/index';
import type { CategoryResponse } from '@/models/category';

export const getAllCategories = async () => {
  const response = await api.get<CategoryResponse>('/categories');

  return response;
};
