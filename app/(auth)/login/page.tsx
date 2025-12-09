'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuthContext } from '@/app/_context/AuthContext';
export default function Login() {
	const { login } = useAuthContext();

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
		e.preventDefault();
		console.log('Form submitted:', formData);

		const status = await login(formData.email, formData.password);

		if (status) {
			redirect('/');
		} else {
			alert('There was a problem in logging you in!');
		}
	}

	async function handleRegister() {
		redirect('/register');
	}

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
				<div className="flex flex-col items-center gap-2 pt-4 bg-sky-500 rounded-xl">
					<p>LOGIN PAGE</p>
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
									onClick={handleRegister}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
