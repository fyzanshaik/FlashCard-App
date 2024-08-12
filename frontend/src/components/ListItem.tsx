import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ListItemProps {
	title: string;
	value: string;
	id: number;

	onEditFlashCard: (data: FormValues, id: number) => void;
	onDeleteFlashCard: (id: number) => void;
}

interface FormValues {
	Title: string;
	Answer: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, value, onEditFlashCard, onDeleteFlashCard, id }) => {
	const { register, handleSubmit, reset } = useForm<FormValues>({
		defaultValues: { Title: title, Answer: value },
	});
	const [open, setOpen] = useState(false);
	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onEditFlashCard(data, id);
		reset(data);
	};
	const onDelete = () => {
		onDeleteFlashCard(id);
	};
	// console.log(id);
	return (
		<div className="flex justify-between items-center py-3 px-4 border border-gray-700 rounded-md bg-gray-800">
			<div className="text-left text-white">{title}</div>
			<div className="flex space-x-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
							EDIT
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-black text-white">
						<DialogHeader>
							<DialogTitle>Edit the Flash Card</DialogTitle>
							<DialogDescription className="text-gray-400">Change the details below to edit the card.</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="title">Question:</Label>
									<Input id="title" {...register('Title', { required: true })} className="bg-black text-white " />
								</div>
								<div className="space-y-2">
									<Label htmlFor="answer">Answer:</Label>
									<Input id="answer" {...register('Answer', { required: true })} className="bg-black text-white" />
								</div>
							</div>
							<DialogFooter>
								<Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white">
									Save
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
							DELETE
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-black text-white">
						<DialogHeader>
							<DialogTitle>Confirmation</DialogTitle>
							<DialogDescription className="text-gray-400">Are you sure you want to delete this card?</DialogDescription>
						</DialogHeader>
						<DialogFooter className="flex space-x-2">
							<Button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white">
								YES
							</Button>{' '}
							<Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={() => setOpen(false)}>
								NO
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default ListItem;
