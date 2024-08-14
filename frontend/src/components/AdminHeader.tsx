import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { PlusCircle, LogIn, UserPlus, LogOut, BookOpen } from 'lucide-react';
interface AddCardFormValue {
	title: string;
	answer: string;
}

interface CardsList {
	id: number;
	title: string;
	answer: string;
}

interface LoginResponse {
	token: string;
}

interface FormValues {
	username?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
}

interface AdminHeaderProps {
	onAddFlashCard: (data: AddCardFormValue) => void;
	data: CardsList[];
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onAddFlashCard, data }) => {
	const API_URL = import.meta.env.VITE_NEW;
	const { register: registerAddCard, handleSubmit: handleAddCardSubmit, reset } = useForm<AddCardFormValue>();
	const navigate = useNavigate();
	const [openAddCard, setOpenAddCard] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		setLoggedIn(!!token);
	}, []);

	const handleClick = () => {
		if (data.length === 0) {
			alert('No flash cards added');
		} else {
			navigate('/start-revision', { state: data });
		}
	};

	const onAddCardSubmit: SubmitHandler<AddCardFormValue> = (data) => {
		onAddFlashCard(data);
		reset();
		setOpenAddCard(false);
	};

	const onSignOut = () => {
		localStorage.removeItem('authToken');
		window.location.href = '/dashboard';
	};

	const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm<FormValues>();
	const onLoginSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
				username: data.username,
				password: data.password,
			});
			localStorage.setItem('authToken', response.data.token);
			window.location.href = '/dashboard';
		} catch (error) {
			console.error('Login error:', error);
		}
		setOpenLogin(false);
	};

	const { register: registerRegister, handleSubmit: handleRegisterSubmit } = useForm<FormValues>();
	const onRegisterSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const response = await axios.post<LoginResponse>(`${API_URL}/auth/signup`, {
				firstname: data.firstName,
				lastname: data.lastName,
				username: data.username,
				password: data.password,
			});
			localStorage.setItem('authToken', response.data.token);
			setLoggedIn(true);
			window.location.href = '/dashboard';
		} catch (error) {
			console.error('Registration error:', error);
		}
		setOpenRegister(false);
	};

	return (
		<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gray-900 text-white p-6 shadow-lg">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<motion.h1
					className="text-4xl  text-transparent bg-clip-text text-white font-mono mb-4 md:mb-0"
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
				>
					FLASHCARDS
				</motion.h1>
				<div className="space-x-4 mb-4 md:mb-0">
					<Button
						variant="outline"
						onClick={handleClick}
						className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105"
					>
						<BookOpen className="w-5 h-5 mr-2" />
						Start Revision
					</Button>
					<Button
						variant="outline"
						onClick={() => setOpenAddCard(true)}
						className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105"
					>
						<PlusCircle className="w-5 h-5 mr-2" />
						Add New Card
					</Button>
				</div>
				<div className="flex space-x-4">
					<AnimatePresence>
						{!loggedIn ? (
							<>
								<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
									<Button
										variant="outline"
										onClick={() => setOpenLogin(true)}
										className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105"
									>
										<LogIn className="w-5 h-5 mr-2" />
										Login
									</Button>
								</motion.div>
								<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, delay: 0.1 }}>
									<Button
										variant="outline"
										onClick={() => setOpenRegister(true)}
										className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105"
									>
										<UserPlus className="w-5 h-5 mr-2" />
										Register
									</Button>
								</motion.div>
							</>
						) : (
							<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
								<Button
									variant="outline"
									onClick={onSignOut}
									className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105"
								>
									<LogOut className="w-5 h-5 mr-2" />
									Sign Out
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Add Card Dialog */}
			<Dialog open={openAddCard} onOpenChange={setOpenAddCard}>
				<DialogContent className="bg-gray-900 text-white border border-gray-700">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-pink-500">Add a new Flash Card</DialogTitle>
						<DialogDescription className="text-gray-400">Fill in the details below to create a new flash card.</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleAddCardSubmit(onAddCardSubmit)}>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="title">Question:</Label>
								<Input id="title" {...registerAddCard('title', { required: true })} className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="answer">Answer:</Label>
								<Input id="answer" {...registerAddCard('answer', { required: true })} className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300" />
							</div>
						</div>
						<DialogFooter>
							<Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-300">
								Save
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Login Dialog */}
			<Dialog open={openLogin} onOpenChange={setOpenLogin}>
				<DialogContent className="bg-gray-900 text-white border border-gray-700">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-pink-500">Login</DialogTitle>
						<DialogDescription className="text-gray-400">Enter your credentials to log in.</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleLoginSubmit(onLoginSubmit)}>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="username">Username:</Label>
								<Input
									id="username"
									{...registerLogin('username', { required: true })}
									className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password:</Label>
								<Input
									type="password"
									id="password"
									{...registerLogin('password', { required: true })}
									className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-300">
								Login
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Register Dialog */}
			<Dialog open={openRegister} onOpenChange={setOpenRegister}>
				<DialogContent className="bg-gray-900 text-white border border-gray-700">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-pink-500">Register</DialogTitle>
						<DialogDescription className="text-gray-400">Fill in the details below to create a new account.</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name:</Label>
								<Input
									id="firstName"
									{...registerRegister('firstName', { required: true })}
									className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name:</Label>
								<Input
									id="lastName"
									{...registerRegister('lastName', { required: true })}
									className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="username">Username:</Label>
								<Input
									id="username"
									{...registerRegister('username', { required: true })}
									className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password:</Label>
								<Input
									type="password"
									id="password"
									{...registerRegister('password', { required: true })}
									className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-300">
								Register
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</motion.div>
	);
};
