import type { Content } from '@/models/content';
import { render, screen } from '@testing-library/react';
import ContentList from '../../components/ContentList';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

const mockContents: Content[] = [
  {
    id: 1,
    title: 'test content',
    category: 'test-category',
    contentType: 'test-type',
    duration: 'test-duration',
    thumbnailUrl: 'http://teste.com/test01.png',
  },
];

describe('ContentList.tsx', () => {
  it('should render the list correctly', () => {
    render(
      <MemoryRouter>
        <ContentList contents={mockContents} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('heading')[0].textContent).toBe(mockContents[0].title);
  });

  it('should not render the list when there is no data', () => {
    render(
      <MemoryRouter>
        <ContentList contents={[]} />
      </MemoryRouter>
    );
    expect(
      screen.getByText('Nenhum dado disponível no momento ou para o filtro selecionado!')
    ).toBeDefined();
  });
});
