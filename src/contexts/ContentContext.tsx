import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { contentDetailsAdapter, contentListAdapter } from '@/models/adapters/contentAdapter';

import type { Category } from '@/models/category';
import type { Content, ContentDetails } from '@/models/content';
import type { AxiosError } from 'axios';

import * as contentService from '@/api/services/content';
import * as categoryService from '@/api/services/category';

import { LoadingContext } from './LoadingContext';

type ContentContextType = {
  contents: Content[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  categorySelected: string;
  search: string;
  contentSelected: ContentDetails | undefined;
  getContents: (page?: number) => void;
  getCategories: () => void;
  setCategory: (slug: string) => void;
  setSearchTerm: (search: string) => void;
  getContent: (contentId: number) => void;
  markAsFavorite: (contentId: number) => void;
  unmarkAsFavorite: (contentId: number) => void;
};

const ContentContext = createContext<ContentContextType>({
  contents: [],
  categories: [],
  currentPage: 0,
  totalPages: 0,
  categorySelected: '',
  search: '',
  contentSelected: undefined,
  getContents: () => {},
  getCategories: () => {},
  setCategory: () => {},
  setSearchTerm: () => {},
  getContent: () => {},
  markAsFavorite: () => {},
  unmarkAsFavorite: () => {},
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
  const [contentSelected, setContentSelected] = useState<ContentDetails>();

  const { openLoading, closeLoading } = useContext(LoadingContext);

  useEffect(() => {
    getContents();
  }, [categorySelected]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getContents();
    }, 1500);

    return () => clearTimeout(timer);
  }, [search]);

  const getContents = useCallback(
    async (page?: number) => {
      try {
        openLoading();
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
        closeLoading();
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

  const getContent = async (contentId: number) => {
    try {
      openLoading();
      if (!contentId) {
        throw new Error('Id Inválido');
      }

      const { data } = await contentService.getContentById(Number(contentId));
      setContentSelected(contentDetailsAdapter(data));
    } catch (error) {
      setContentSelected(undefined);
      alert('Conteúdo não encontrado');
    } finally {
      closeLoading();
    }
  };

  const markAsFavorite = async (contentId: number) => {
    try {
      openLoading();
      await contentService.markAsFavorite(contentId);
      getContent(contentId);
    } catch (error) {
      alert('Falha ao favoritar conteúdo');
      closeLoading();
    }
  };

  const unmarkAsFavorite = async (contentId: number) => {
    try {
      openLoading();
      await contentService.unmarkAsFavorite(contentId);
      getContent(contentId);
    } catch (error) {
      alert('Falha ao desfavoritar conteúdo');
      closeLoading();
    }
  };

  return (
    <ContentContext.Provider
      value={{
        contents,
        categories,
        currentPage,
        totalPages,
        categorySelected,
        search,
        contentSelected,
        getContents,
        getCategories,
        setCategory,
        setSearchTerm,
        getContent,
        markAsFavorite,
        unmarkAsFavorite,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentContextProvider };
