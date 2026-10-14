import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ContentContext } from '@/contexts/ContentContext';
import { LoadingContext } from '@/contexts/LoadingContext';
import ContentFilter from '@/components/ContentFilter';

const getCategories = vi.fn();
const setCategory = vi.fn();
const setSearchTerm = vi.fn();

const categories = [
  { name: 'Meditação', slug: 'meditacao' },
  { name: 'Yoga', slug: 'yoga' },
];

const renderComponent = ({ categorySelected = '', search = '', loading = false } = {}) => {
  return render(
    <ContentContext.Provider
      value={
        {
          categories,
          getCategories,
          categorySelected,
          setCategory,
          search,
          setSearchTerm,
        } as never
      }
    >
      <LoadingContext.Provider value={{ loading } as never}>
        <ContentFilter />
      </LoadingContext.Provider>
    </ContentContext.Provider>
  );
};

describe('ContentFilter.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the title and filter controls', () => {
    renderComponent();

    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Busque pelo título')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: '' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Limpar Filtros' })).toBeInTheDocument();
  });

  it('should call getCategories when load the page', () => {
    renderComponent();

    expect(getCategories).toHaveBeenCalledTimes(1);
  });

  it('should display the available categories', () => {
    renderComponent();

    expect(screen.getByRole('option', { name: categories[0].name })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: categories[1].name })).toBeInTheDocument();
  });

  it('should call setSearchTerm when typing in the search field', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.type(screen.getByPlaceholderText('Busque pelo título'), 'Teste');

    expect(setSearchTerm).toHaveBeenCalled();
  });

  it('should call setCategory when selecting a category', () => {
    renderComponent();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: categories[0].slug },
    });

    expect(setCategory).toHaveBeenCalledWith('meditacao');
  });

  it('should clear the selected category and search term', async () => {
    const user = userEvent.setup();

    renderComponent({
      categorySelected: categories[0].slug,
      search: 'Teste',
    });

    await user.click(screen.getByRole('button', { name: 'Limpar Filtros' }));

    expect(setCategory).toHaveBeenCalledWith('');
    expect(setSearchTerm).toHaveBeenCalledWith('');
  });

  it('should disable the controls while loading', () => {
    renderComponent({ loading: true });

    expect(screen.getByPlaceholderText('Busque pelo título')).toBeDisabled();

    expect(screen.getByRole('combobox')).toBeDisabled();

    expect(screen.getByRole('button', { name: 'Limpar Filtros' })).toBeDisabled();
  });

  it('should disable the clear button when there are no active filters', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'Limpar Filtros' })).toBeDisabled();
  });
});
