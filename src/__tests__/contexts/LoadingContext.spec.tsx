import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useContext } from 'react';

import { LoadingContext, LoadingContextProvider } from '@/contexts/LoadingContext';

const Consumer = () => {
  const { loading, openLoading, closeLoading } = useContext(LoadingContext);

  return (
    <>
      <span data-testid="loading">{String(loading)}</span>
      <button onClick={openLoading}>Abrir</button>
      <button onClick={closeLoading}>Fechar</button>
    </>
  );
};

const renderProvider = () =>
  render(
    <LoadingContextProvider>
      <Consumer />
    </LoadingContextProvider>
  );

describe('LoadingContext', () => {
  it('should initialize loading as false', () => {
    renderProvider();

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('should open loading', () => {
    renderProvider();

    act(() => {
      screen.getByRole('button', { name: 'Abrir' }).click();
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
  });

  it('should close loading', () => {
    renderProvider();

    act(() => {
      screen.getByRole('button', { name: 'Abrir' }).click();
    });

    act(() => {
      screen.getByRole('button', { name: 'Fechar' }).click();
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });
});
