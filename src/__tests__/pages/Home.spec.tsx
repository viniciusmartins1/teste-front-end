import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Home from '@/pages/Home';
import { ContentContext } from '@/contexts/ContentContext';
import { LoadingContext } from '@/contexts/LoadingContext';

vi.mock('@/components/ContentFilter', () => ({
  default: () => <div>Filtros</div>,
}));

vi.mock('@/components/ContentList', () => ({
  default: () => <div>Lista de conteúdos</div>,
}));

vi.mock('@/components/ContentPagination', () => ({
  default: () => <div>Paginação</div>,
}));

const getContents = vi.fn();

const renderPage = ({ loading = false, totalPages = 1 } = {}) =>
  render(
    <ContentContext.Provider value={{ contents: [], getContents, totalPages } as never}>
      <LoadingContext.Provider value={{ loading } as never}>
        <Home />
      </LoadingContext.Provider>
    </ContentContext.Provider>
  );

describe('Home', () => {
  it('should display the page title and filters', () => {
    renderPage();

    expect(screen.getByText('Catálogo de Produtos')).toBeInTheDocument();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
  });

  it('should call getContents when the page loads', async () => {
    renderPage();

    await waitFor(() => {
      expect(getContents).toHaveBeenCalled();
    });
  });

  it('should display pagination when there is more than one page', () => {
    renderPage({ totalPages: 2 });

    expect(screen.getByText('Paginação')).toBeInTheDocument();
  });
});
