import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContextProvider } from '@/shared/AppContext';

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </QueryClientProvider>
  );
};
