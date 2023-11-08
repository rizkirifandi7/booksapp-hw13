import { useState } from "react";
import { registerUser } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return;
		}
		try {
			await registerUser(e.target.name.value, e.target.email.value, password);
			navigate("/");
		} catch (e) {
			const error = new Error(e);
			setError(error?.message || "An error occurred");
		}
	};

	return (
		<div className="w-full max-w-xl mx-auto mt-8 px-6 py-4 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-center mb-4">Register</h2>

			{error && <p className="text-red-500 mb-2">{error}</p>}

			<form onSubmit={handleSubmit} className="space-y-3">
				<div>
					<label className="block text-gray-700">Name</label>
					<input type="name" name="name" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md" />
				</div>

				<div>
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						placeholder="Enter your email address"
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-gray-700">Password</label>
					<input
						type="password"
						placeholder="Enter a password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-gray-700">Confirm Password</label>
					<input
						type="password"
						placeholder="Confirm your password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded-md"
					/>
					{password !== confirmPassword && <p className="text-xs text-red-500">The password does not match</p>}
				</div>

				<button
					type="submit"
					className="w-full mt-2 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
