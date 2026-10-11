export type Pagination = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type ContentResponse = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  durationSeconds: number;
  instructor: string;
  thumbnailUrl: string;
  publishedAt: string;
};

export type ContentPaginationResponse = {
  data: ContentResponse[];
};

export type Content = {
  id: number;
  title: string;
  category: string;
  contentType: string;
  duration: string;
  thumbnailUrl: string;
};

export type ContentRequestParams = {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export type ContentDetailsResponse = {
  category: string;
  description: string;
  durationSeconds: number;
  id: number;
  instructor: string;
  isFavorite: boolean;
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
  type: string;
};

export type ContentDetails = {
  category: string;
  description: string;
  duration: string;
  id: number;
  instructor: string;
  isFavorite: boolean;
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
  contentType: string;
};
