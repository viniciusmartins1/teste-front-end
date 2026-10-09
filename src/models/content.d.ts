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
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type Content = {
  id: number;
  title: string;
  category: string;
  contentType: string;
  duration: string;
  thumbnailUrl: string;
};
