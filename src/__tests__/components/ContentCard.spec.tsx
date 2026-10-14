import type { Content } from '@/models/content';
import { render, screen } from '@testing-library/react';
import ContentCard from '../../components/ContentCard';
import { describe, beforeAll, it, expect } from 'vitest';

const mockContent: Content = {
  id: 0,
  title: 'test content',
  category: 'test-category',
  contentType: 'test-type',
  duration: 'test-duration',
  thumbnailUrl: 'http://teste.com/test.png',
};

describe('ContentCard.tsx', () => {
  // const component: typeof ContentCard = {};

  beforeAll(() => {
    render(
      <ContentCard
        title={mockContent.title}
        category={mockContent.category}
        contentType={mockContent.contentType}
        duration={mockContent.duration}
        thumbnailUrl={mockContent.duration}
      />
    );
  });

  it('should render the card correctly', () => {
    expect(screen.getByRole('heading').textContent).toBe(mockContent.title);
  });
});
