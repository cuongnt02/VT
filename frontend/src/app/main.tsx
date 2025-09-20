import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from '@/features/feed/pages/HomePage.tsx';
import { ThemeProvider } from './theme-provider';

const root = document.getElementById('root');


createRoot(root!).render(
	<StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
)
