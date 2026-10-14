import { ContentContext } from '@/contexts/ContentContext';
import ContentPagination from '@/components/ContentPagination';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ContentPagination.tsx', () => {
  const getContents = vi.fn();

  const renderComponent = (currentPage: number, totalPages: number) => {
    return render(
      <ContentContext.Provider value={{ currentPage, totalPages, getContents } as never}>
        <ContentPagination />
      </ContentContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display current page and the total of pages', () => {
    renderComponent(1, 3);
    expect(screen.getByText('1 de 3')).toBeDefined();
  });

  it('should disable the previous button on the first page', () => {
    renderComponent(1, 3);

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    renderComponent(3, 3);

    expect(screen.getByRole('button', { name: 'Próximo' })).toBeDisabled();
  });

  it('should call getContents with the next page', async () => {
    const user = userEvent.setup();

    renderComponent(2, 3);

    await user.click(screen.getByRole('button', { name: 'Próximo' }));

    expect(getContents).toHaveBeenCalledWith(3);
  });

  it('should call getContents with the previous page', async () => {
    const user = userEvent.setup();

    renderComponent(2, 3);

    await user.click(screen.getByRole('button', { name: 'Anterior' }));

    expect(getContents).toHaveBeenCalledWith(1);
  });
});
