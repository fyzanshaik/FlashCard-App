import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
interface ListItemProps {
	title: string;
	value: string;
	onEditFlashCard: (data: FormValues) => void;
}
interface FormValues {
	Title: string;
	Answer: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, value, onEditFlashCard }) => {
	console.log(value);
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onEditFlashCard(data);
		reset();
	};
	return (
		<div>
			<div className="">{title}</div>
			<div className="">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">EDIT</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] bg-black">
						<DialogHeader>
							<DialogTitle className="text-white">Edit the Flash Card</DialogTitle>
							<DialogDescription className="text-slate-400">Change the details below to edit the card.</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-4 py-4 ">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="title" className="text-left text-slate-100">
										Question:
									</Label>
									<Input id="title" {...register('Title', { required: true })} value={title} className="col-span-3  bg-black text-white" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="answer" className="text-left text-slate-100">
										Answer:
									</Label>
									<Input id="answer" {...register('Answer', { required: true })} value={value} className="col-span-3 bg-black text-white" />
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Save</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				<Button variant="outline">DELETE</Button>
			</div>
		</div>
	);
};

export default ListItem;
