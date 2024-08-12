const url = 'http://ec2-13-60-197-192.eu-north-1.compute.amazonaws.com:8080/api/add-flash-card';
const fakeFlashCards = [
	{ Title: 'What is React?', Answer: 'A JavaScript library for building user interfaces.' },
	{ Title: 'What is TypeScript?', Answer: 'A typed superset of JavaScript that compiles to plain JavaScript.' },
	{ Title: 'Explain useState in React.', Answer: 'useState is a Hook that lets you add state to functional components.' },
	{ Title: 'What is an interface in TypeScript?', Answer: 'An interface defines the shape of an object, describing its structure.' },
	{ Title: "What does the 'map' function do in JavaScript?", Answer: "The 'map' function creates a new array by applying a function to each element of an existing array." },
	{ Title: 'What is a component in React?', Answer: 'A component is a reusable piece of UI that can manage its own state and props.' },
	{ Title: 'What is Tailwind CSS?', Answer: 'A utility-first CSS framework for rapidly building custom designs.' },
	{ Title: 'What is the purpose of useEffect in React?', Answer: 'useEffect lets you perform side effects in function components.' },
	{ Title: 'What is Prisma?', Answer: 'Prisma is an open-source ORM for Node.js and TypeScript that helps developers build faster and type-safe database access.' },
	{ Title: 'What is the difference between Props and State in React?', Answer: 'Props are used to pass data from parent to child components, while state is local data managed within a component.' },
];

for (let i = 0; i < fakeFlashCards.length; i++) {
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(fakeFlashCards[i]),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.error(error));
}
