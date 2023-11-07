import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		const fetchBooks = async () => {
			const books = await getAllBooks();
			setBooks(books);
		};
		fetchBooks();
	}, []);

	return (
		<div className="flex flex-wrap justify-center w-full">
			{books?.books?.map((book) => (
				<Books key={`${book.id} ${book.title}`} {...book} />
			))}
		</div>
	);
}
