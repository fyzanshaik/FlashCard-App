import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import AdminDashboard from './components/AdminDashboard';
import { RevisionPage } from './components/RevisionPage';
export const App = () => {
	return (
		<div className="">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route path="/dashboard" element={<AdminDashboard />}></Route>
					<Route path="/start-revision" element={<RevisionPage />}></Route>
				</Routes>
				<Toaster />
			</BrowserRouter>
		</div>
	);
};
