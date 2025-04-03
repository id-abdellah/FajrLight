import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.scss';

// redux toolkit
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

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
        <PersistGate persistor={persistor} loading={null}>
          <Provider store={store}>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <App />
          </Provider>
        </PersistGate>
      </QueryClientProvider>
    </BrowserRouter>
  </>,
);
