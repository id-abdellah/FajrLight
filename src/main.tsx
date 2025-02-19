import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.scss';

// redux toolkit
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Router
import { BrowserRouter } from 'react-router';

// toaster notification
import { Toaster } from 'react-hot-toast';

const queryClient: QueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </>,
);
