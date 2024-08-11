import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormValues {
	Title: string;
	Answer: string;
}

interface AdminHeaderProps {
	onAddFlashCard: (data: FormValues) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onAddFlashCard }) => {
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onAddFlashCard(data);
		reset();
	};

	return (
		<>
			<div className="col-span-2">
				<div className="text-4xl font-bold text-center py-4 font-mono text-gray-800">Flash Cards</div>
				<Button variant="outline">Start Revision</Button>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">Add a new Flash Card</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] bg-black">
						<DialogHeader>
							<DialogTitle className="text-white">Add a new Flash Card</DialogTitle>
							<DialogDescription className="text-slate-400">Fill in the details below to create a new flash card.</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-4 py-4 ">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="title" className="text-left text-slate-100">
										Question:
									</Label>
									<Input id="title" {...register('Title', { required: true })} className="col-span-3  bg-black text-white" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="answer" className="text-left text-slate-100">
										Answer:
									</Label>
									<Input id="answer" {...register('Answer', { required: true })} className="col-span-3 bg-black text-white" />
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Save</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};
