import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import { RevisionPage } from './components/RevisionPage';
export const App = () => {
	return (
		<div className="">
			<BrowserRouter>
				<Routes>
					<Route path="/dashboard" element={<AdminDashboard />}></Route>
					<Route path="/start-revision" element={<RevisionPage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
