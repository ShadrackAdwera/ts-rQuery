import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const { toast } = createStandaloneToast({ theme });

const queryErrorHandler = (error: unknown): void => {
  const title =
    error instanceof Error ? error.message : 'An error occured, try again';
  toast.closeAll();

  toast({ id: 'rQuery Toast', title, isClosable: true, position: 'top-right' });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
