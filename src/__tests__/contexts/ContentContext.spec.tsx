import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useContext } from 'react';

import { ContentContext, ContentContextProvider } from '@/contexts/ContentContext';
import { LoadingContext } from '@/contexts/LoadingContext';
import * as contentService from '@/api/services/content';
import * as categoryService from '@/api/services/category';
import type { Content } from '@/models/content';

vi.mock('@/api/services/content', () => ({
  getAllContents: vi.fn(),
  getContentById: vi.fn(),
  markAsFavorite: vi.fn(),
  unmarkAsFavorite: vi.fn(),
}));

vi.mock('@/api/services/category', () => ({
  getAllCategories: vi.fn(),
}));

const mockContents: Content[] = [
  {
    id: 1,
    title: 'Teste',
    category: 'meditacao',
    contentType: 'teste',
    duration: 'teste',
    thumbnailUrl: 'teste',
  },
];
const mockCategories = [{ name: 'Meditação', slug: 'meditacao' }];

const openLoading = vi.fn();
const closeLoading = vi.fn();

const Consumer = () => {
  const context = useContext(ContentContext);
  return (
    <>
      <span data-testid="contents">{JSON.stringify(context.contents)}</span>
      <span data-testid="categories">{JSON.stringify(context.categories)}</span>
      <span data-testid="selected">{JSON.stringify(context.contentSelected)}</span>

      <button onClick={context.getCategories}>Categorias</button>
      <button onClick={() => context.setCategory('meditacao')}>Filtrar</button>
      <button onClick={() => context.getContent(1)}>Detalhes</button>
      <button onClick={() => context.markAsFavorite(1)}>Marcar como favorito</button>
    </>
  );
};

const renderProvider = () =>
  render(
    <LoadingContext.Provider value={{ openLoading, closeLoading } as never}>
      <ContentContextProvider>
        <Consumer />
      </ContentContextProvider>
    </LoadingContext.Provider>
  );

describe('ContentContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(contentService.getAllContents).mockResolvedValue({
      data: { data: mockContents, page: 1, totalPages: 3 },
    } as never);

    vi.mocked(categoryService.getAllCategories).mockResolvedValue({
      data: { data: mockCategories },
    } as never);

    vi.mocked(contentService.getContentById).mockResolvedValue({
      data: mockContents[0],
    } as never);

    vi.mocked(contentService.markAsFavorite).mockResolvedValue({} as never);
  });

  it('should load contents on initialization', async () => {
    renderProvider();

    await waitFor(() => {
      expect(contentService.getAllContents).toHaveBeenCalled();
      expect(screen.getByTestId('contents')).toHaveTextContent('Teste');
    });
  });

  it('should load categories', async () => {
    renderProvider();

    await act(async () => {
      screen.getByRole('button', { name: 'Categorias' }).click();
    });

    await waitFor(() => {
      expect(categoryService.getAllCategories).toHaveBeenCalled();
      expect(screen.getByTestId('categories')).toHaveTextContent('Meditação');
    });
  });

  it('should filter contents by category', async () => {
    renderProvider();

    await act(async () => {
      screen.getByRole('button', { name: 'Filtrar' }).click();
    });

    await waitFor(() => {
      expect(contentService.getAllContents).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'meditacao' })
      );
    });
  });

  it('should load content details', async () => {
    renderProvider();

    await act(async () => {
      screen.getByRole('button', { name: 'Detalhes' }).click();
    });

    await waitFor(() => {
      expect(contentService.getContentById).toHaveBeenCalledWith(1);
      expect(screen.getByTestId('selected')).toHaveTextContent('Teste');
    });
  });

  it('should mark content as favorite and refresh its details', async () => {
    renderProvider();

    await act(async () => {
      screen.getByRole('button', { name: 'Marcar como favorito' }).click();
    });

    await waitFor(() => {
      expect(contentService.markAsFavorite).toHaveBeenCalledWith(1);
      expect(contentService.getContentById).toHaveBeenCalledWith(1);
    });
  });

  it('should close loading after fetching contents', async () => {
    renderProvider();

    await waitFor(() => {
      expect(openLoading).toHaveBeenCalled();
      expect(closeLoading).toHaveBeenCalled();
    });
  });
});
