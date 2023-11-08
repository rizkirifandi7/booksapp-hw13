import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
	const [book, setBook] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await getBookDetailById(id);
				setBook(response.book);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		fetchBook();
	}, [id]);

	const handleDeleteBook = async () => {
		try {
			await deleteBook(id);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<div className="p-10">
			{isLoading ? (
				<div className="h-64 my-6 bg-gray-200 animate-pulse" />
			) : (
				<div className="flex flex-col md:flex-row bg-white p-5 rounded-lg shadow-md my-6">
					<div className="w-full md:w-72">
						<img
							src={`http://localhost:8000/${book.image}`}
							alt={book.title}
							className="w-full h-64 object-cover rounded-lg"
						/>
					</div>
					<div className="mt-4 md:mt-0 md:ml-8">
						<div className="flex justify-between items-center">
							<h1 className="text-3xl font-bold text-gray-700">{book.title}</h1>
							<button
								onClick={() => navigate(-1)}
								className="px-4 py-2 font-bold text-xl text-black hover:text-blue-950"
							>
								X
							</button>
						</div>
						<p className="mt-2 text-lg font-semibold text-gray-500">Author : {book.author}</p>
						<p className="mt-1 text-lg font-semibold text-gray-500">Publisher : {book.publisher}</p>
						<p className="mt-1 text-lg font-semibold text-gray-500">Year : {book.year}</p>
						<p className="mt-1 text-lg font-semibold text-gray-500">Pages : {book.pages}</p>
						<p className="mt-1 text-lg font-semibold text-gray-500 mb-4">
							Sinopsis : <br></br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil minus cum fugit
							aperiam eaque saepe obcaecati sit! Quia, sed mollitia.
						</p>
					</div>
				</div>
			)}
			{localStorage.getItem("token") && (
				<div className="flex space-x-4">
					<button onClick={openModal} className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700">
						Delete
					</button>
					<Link to={`/editbook/${id}`} className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
						Edit
					</Link>
				</div>
			)}
			{modalIsOpen ? (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity" aria-hidden="true">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
											Are you sure you want to delete this book?
										</h3>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={handleDeleteBook}
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Delete
								</button>
								<button
									onClick={closeModal}
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
