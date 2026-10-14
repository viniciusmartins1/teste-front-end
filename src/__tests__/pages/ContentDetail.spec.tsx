import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';

import ContentDetail from '@/pages/ContentDetail';
import { ContentContext } from '@/contexts/ContentContext';
import { LoadingContext } from '@/contexts/LoadingContext';

const getContent = vi.fn();
const markAsFavorite = vi.fn();
const unmarkAsFavorite = vi.fn();

const renderPage = ({ loading = false, content = undefined } = {}) =>
  render(
    <LoadingContext.Provider value={{ loading } as never}>
      <ContentContext.Provider
        value={
          {
            contentSelected: content,
            getContent,
            markAsFavorite,
            unmarkAsFavorite,
          } as never
        }
      >
        <MemoryRouter>
          <ContentDetail />
        </MemoryRouter>
      </ContentContext.Provider>
    </LoadingContext.Provider>
  );

describe('ContentDetail', () => {
  it('should display the loading indicator', () => {
    renderPage({ loading: true });

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should display a not found message when content is undefined', () => {
    renderPage();

    expect(screen.getByText('Conteúdo não encontrado')).toBeInTheDocument();
  });

  it('should display content details and allow favoriting', () => {
    const content = {
      id: 1,
      title: 'Meditação',
      description: 'Teste teste teste',
      instructor: 'João',
      category: 'meditacao',
      contentType: 'audio',
      duration: '20min',
      thumbnailUrl: '',
    };

    renderPage({ content } as never);

    expect(screen.getByText('Meditação')).toBeInTheDocument();

    act(() => {
      screen
        .getByRole('button', {
          name: 'Marcar como Favorito',
        })
        .click();
    });

    expect(markAsFavorite).toHaveBeenCalledWith(1);
  });
});
