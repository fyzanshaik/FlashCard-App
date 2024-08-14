import React, { useEffect, useState, useCallback, createContext, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sun, Moon } from 'lucide-react';
import { AdminHeader } from './AdminHeader';
import ListItem from './ListItem';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// Theme context
const ThemeContext = createContext<{
	isDark: boolean;
	toggleTheme: () => void;
}>({ isDark: true, toggleTheme: () => {} }); // Default to dark mode

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isDark, setIsDark] = useState(true); // Start in dark mode
	const toggleTheme = () => setIsDark(!isDark);

	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use theme
const useTheme = () => useContext(ThemeContext);

// Interfaces
interface CardsList {
	id: number;
	title: string;
	answer: string;
}

interface FormValues {
	title: string;
	answer: string;
}

interface AddCardFormValue {
	title: string;
	answer: string;
}

const API_URL = import.meta.env.VITE_NEW;

const Dashboard = () => {
	const [flashCards, setFlashCards] = useState<CardsList[]>([]);
	const [loading, setLoading] = useState(false);
	const token = localStorage.getItem('authToken');
	const { isDark, toggleTheme } = useTheme();

	const fetchFlashCards = useCallback(async () => {
		try {
			setLoading(true);
			const headers = token ? { authorization: token } : {};
			const response = await axios.get<CardsList[]>(`${API_URL}/get-flash-cards`, { headers });
			setFlashCards(response.data);
		} catch (err) {
			console.error('Error fetching flash cards:', err);
		} finally {
			setLoading(false);
		}
	}, [token]);

	useEffect(() => {
		fetchFlashCards();
	}, [fetchFlashCards]);

	const handleAddFlashCard = useCallback(
		(newCard: AddCardFormValue) => {
			const cardWithId: CardsList = { ...newCard, id: Date.now() };
			setFlashCards((prev) => [...prev, cardWithId]);
			const headers = token ? { authorization: token } : {};
			axios.post(`${API_URL}/add-flash-card`, cardWithId, { headers }).catch((err) => {
				console.error('Error adding flash card:', err);
				setFlashCards((prev) => prev.filter((card) => card.id !== cardWithId.id));
			});
		},
		[token]
	);

	const handleEditFlashCard = useCallback(
		(updatedCard: FormValues, id: number) => {
			setFlashCards((prev) => prev.map((card) => (card.id === id ? { ...updatedCard, id } : card)));
			const headers = token ? { authorization: token } : {};
			axios.put(`${API_URL}/edit-flash-card/${id}`, { ...updatedCard, id }, { headers }).catch((err) => {
				console.error('Error editing flash card:', err);
				fetchFlashCards();
			});
		},
		[fetchFlashCards, token]
	);

	const handleDeleteFlashCard = useCallback(
		(id: number) => {
			setFlashCards((prev) => prev.filter((card) => card.id !== id));
			const headers = token ? { authorization: token } : {};
			axios.delete(`${API_URL}/delete-flash-card/${id}`, { headers }).catch((err) => {
				console.error('Error deleting flash card:', err);
				fetchFlashCards();
			});
		},
		[fetchFlashCards, token]
	);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} font-['Inter']`}
			animate={{ backgroundColor: isDark ? '#111827' : '#F9FAFB' }}
			transition={{ duration: 0.5 }}
		>
			<AdminHeader onAddFlashCard={handleAddFlashCard} data={flashCards} />
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<Button
						onClick={toggleTheme}
						variant="outline"
						size="icon"
						className={`${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} hover:bg-blue-500 hover:text-white transition-all duration-300`}
					>
						{isDark ? <Sun className="h-[1.5rem] w-[1.5rem]" /> : <Moon className="h-[1.5rem] w-[1.5rem]" />}
					</Button>
				</div>
				<Card className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg border-none`}>
					<CardContent className="p-6">
						{loading ? (
							<div className="flex justify-center items-center h-64">
								<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
							</div>
						) : (
							<ScrollArea className="h-[70vh] pr-4">
								<AnimatePresence>
									<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
										{flashCards.length === 0 ? (
											<motion.h3 variants={itemVariants} className="text-center text-lg font-semibold text-gray-500">
												No Cards Added Yet
											</motion.h3>
										) : (
											flashCards.map((item) => (
												<motion.div key={item.id} variants={itemVariants}>
													<ListItem id={item.id} title={item.title} value={item.answer} onEditFlashCard={handleEditFlashCard} onDeleteFlashCard={handleDeleteFlashCard} />
												</motion.div>
											))
										)}
									</motion.div>
								</AnimatePresence>
							</ScrollArea>
						)}
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
};

const DashboardWithTheme = () => (
	<ThemeProvider>
		<Dashboard />
	</ThemeProvider>
);

export default DashboardWithTheme;
