'use client';

import { useState } from 'react';
import { useAuthContext } from '@/app/_context/AuthContext';
export default function Login() {
	const auth = useAuthContext();

	const [formData, setFormData] = useState<FormData>({
		password: '',
		email: '',
	});

	// Define the type for your form data
	interface FormData {
		password: string;
		email: string;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Prevent default form submission behavior (page reload)
		console.log('Form submitted:', formData);
		// Here you would typically send the formData to an API or perform other actions
		// alert(`Thank you, ${formData.email}!`);
	}

	async function handleRegister() {}

	async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen">
				{/* FORM */}
				<div className=" bg-sky-500 rounded-xl">
					<form
						className="flex flex-col items-center gap-5 p-4"
						onSubmit={handleSubmit}
						method="post"
					>
						{/* Email */}
						<div className="flex gap-2">
							<label className="w-20 grow" htmlFor="">
								Email
							</label>
							<input
								value={formData.email}
								onChange={handleChange}
								type="text"
								name="email"
								placeholder="email@email.com"
								id=""
							/>
						</div>
						{/* Password */}
						<div className="flex gap-2">
							<label className="w-20 grow" htmlFor="">
								Password
							</label>
							<input
								value={formData.password}
								type="password"
								onChange={handleChange}
								name="password"
								placeholder="password"
								id=""
							/>
						</div>
						<hr className="bg-black w-full" />
						<div className="flex justify-center gap-2 w-full">
							{/* Submit */}
							<div className="flex justify-center">
								<input
									className="bg-yellow-500 rounded-lg p-3"
									type="submit"
									value="Login"
								/>
							</div>

							{/* Register */}
							<div className="flex justify-center">
								<input
									className="bg-white rounded-lg p-3"
									type="button"
									value="Register"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
