import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';

interface ListItemProps {
	title: string;
	value: string;
	id: number;
	onEditFlashCard: (data: FormValues, id: number) => void;
	onDeleteFlashCard: (id: number) => void;
}

interface FormValues {
	title: string;
	answer: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, value, onEditFlashCard, onDeleteFlashCard, id }) => {
	const { register, handleSubmit, reset } = useForm<FormValues>({
		defaultValues: { title: title, answer: value },
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onEditFlashCard(data, id);
		reset(data);
		setIsDialogOpen(false);
	};

	const onDelete = () => {
		onDeleteFlashCard(id);
		setIsDeleteDialogOpen(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="flex justify-between items-center py-4 px-6 border border-gray-700 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
		>
			<div className="text-left text-white text-lg font-medium">{title}</div>
			<div className="flex space-x-3">
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-colors duration-300">
							<Edit className="w-4 h-4 mr-2" />
							EDIT
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-gray-900 text-white border border-gray-700">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold text-pink-500">Edit Flash Card</DialogTitle>
							<DialogDescription className="text-gray-400">Modify the details below to update the card.</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="title" className="text-white">
										Question:
									</Label>
									<Input id="title" {...register('title', { required: true })} className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="answer" className="text-white">
										Answer:
									</Label>
									<Input id="answer" {...register('answer', { required: true })} className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 transition-colors duration-300" />
								</div>
							</div>
							<DialogFooter>
								<Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-300">
									Save Changes
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" className="text-white border-gray-400 bg-black hover:bg-red-700 hover:text-white transition-colors duration-300">
							<Trash2 className="w-4 h-4 mr-2" />
							DELETE
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-gray-900 text-white border border-gray-700">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold text-red-500 flex items-center">
								<AlertTriangle className="w-6 h-6 mr-2" />
								Confirm Deletion
							</DialogTitle>
							<DialogDescription className="text-gray-400">Are you sure you want to delete this flash card? This action cannot be undone.</DialogDescription>
						</DialogHeader>
						<DialogFooter className="flex space-x-3">
							<Button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-300">
								Yes, Delete
							</Button>
							<Button className="bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300" onClick={() => setIsDeleteDialogOpen(false)}>
								Cancel
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</motion.div>
	);
};

export default ListItem;
