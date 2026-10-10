import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { contentListAdapter } from '@/models/adapters/contentAdapter';

import type { Category } from '@/models/category';
import type { Content } from '@/models/content';
import type { AxiosError } from 'axios';

import * as contentService from '@/api/services/content';
import * as categoryService from '@/api/services/category';

type ContentContextType = {
  contents: Content[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  categorySelected: string;
  search: string;
  loading: boolean;
  getContents: (page?: number) => void;
  getCategories: () => void;
  setCategory: (slug: string) => void;
  setSearchTerm: (search: string) => void;
};

const ContentContext = createContext<ContentContextType>({
  contents: [],
  categories: [],
  currentPage: 0,
  totalPages: 0,
  categorySelected: '',
  search: '',
  loading: false,
  getContents: () => {},
  getCategories: () => {},
  setCategory: () => {},
  setSearchTerm: () => {},
});

type ContentProviderProps = {
  children: ReactNode;
};

const ContentContextProvider = ({ children }: ContentProviderProps) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categorySelected, setCategorySelected] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getContents = useCallback(
    async (page?: number) => {
      try {
        setLoading(true);
        const { data } = await contentService.getAllContents({
          page: page || currentPage,
          category: categorySelected,
          search: search,
        });

        setContents(
          data && data.data.length ? data.data.map((content) => contentListAdapter(content)) : []
        );
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      } catch (error) {
        alert((error as AxiosError).message);
        setContents([]);
        setCurrentPage(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [categorySelected, currentPage, search]
  );

  const getCategories = async () => {
    try {
      const { data } = await categoryService.getAllCategories();

      setCategories(data && data.data.length ? data.data : []);
    } catch (error) {
      alert((error as AxiosError).message);
      setCategories([]);
    }
  };

  const setCategory = (slug: string) => {
    setCategorySelected(slug);
  };

  const setSearchTerm = (search: string) => {
    setSearch(search);
  };

  useEffect(() => {
    getContents();
  }, [categorySelected]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getContents();
    }, 1500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <ContentContext.Provider
      value={{
        contents,
        categories,
        currentPage,
        totalPages,
        categorySelected,
        search,
        loading,
        getContents,
        getCategories,
        setCategory,
        setSearchTerm,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentContextProvider };
