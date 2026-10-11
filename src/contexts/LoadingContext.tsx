import { createContext, useState, type ReactNode } from 'react';

type LoadingContextType = {
  loading: boolean;
  openLoading: () => void;
  closeLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  openLoading: () => {},
  closeLoading: () => {},
});

type LoadingProviderProps = {
  children: ReactNode;
};

const LoadingContextProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  const openLoading = () => {
    setLoading(true);
  };
  const closeLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        openLoading,
        closeLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingContextProvider };
