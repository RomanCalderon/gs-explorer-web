import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

import './App.css'
import './styles/theme.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/${url}`);
        return data;
      },
      staleTime: 1000 * 60 * 5,
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}

export default App
