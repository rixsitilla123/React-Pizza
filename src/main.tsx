import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ProdcutsContext } from './context/Context.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 10,
			// @ts-ignore
			cacheTime: 1000 * 60 * 5
		}
	}
})

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<ProdcutsContext>
				<App />
			</ProdcutsContext>
		</QueryClientProvider>
	</BrowserRouter>
)
