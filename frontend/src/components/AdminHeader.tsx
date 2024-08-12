import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/start-revision');
	};

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onAddFlashCard(data);
		reset();
	};

	return (
		<div className="bg-gray-800 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-4xl font-bold text-pink-500">FLASHCARDS</h1>
				<div className="space-x-4">
					<Button variant="outline" onClick={handleClick} className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
						Start Revision
					</Button>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
								Add New Card
							</Button>
						</DialogTrigger>
						<DialogContent className="bg-black text-white">
							<DialogHeader>
								<DialogTitle>Add a new Flash Card</DialogTitle>
								<DialogDescription className="text-gray-400">Fill in the details below to create a new flash card.</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-4 py-4">
									<div className="space-y-2">
										<Label htmlFor="title">Question:</Label>
										<Input id="title" {...register('Title', { required: true })} className="bg-black text-white" />
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
				</div>
			</div>
		</div>
	);
};
