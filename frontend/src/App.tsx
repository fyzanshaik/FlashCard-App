import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/dashboard" element={<AdminDashboard />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};
