import React from 'react';
import FlipCard from './FlipCardComponent';
import { RevisionHeader } from './RevisionHeader';
export const RevisionPage: React.FC = () => {
	
	return (
		<>
			<RevisionHeader></RevisionHeader>
			<div className="flex min-h-screen items-center justify-center bg-mirage">
				<FlipCard title="What is React?" answer="A JavaScript library for building user interfaces." />
			</div>
		</>
	);
};
