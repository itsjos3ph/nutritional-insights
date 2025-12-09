'use client';
import { useAuthContext } from '../_context/AuthContext';
import { redirect } from 'next/navigation';

export default function Header() {
	const { logout } = useAuthContext();
	function getEmail() {
		const email = localStorage.getItem('Z-USER-ACCOUNT')
			? localStorage.getItem('Z-USER-ACCOUNT')
			: null;
		return email;
	}

	async function handleLogoutClick() {
		const email = localStorage.setItem('Z-USER-ACCOUNT', '');
		const status = await logout(email!);
		if (status) {
			redirect('/login');
		} else {
			alert('There was a problem in logging you out!');
		}
	}

	return (
		<header className="bg-blue-600 p-4 text-white">
			<div className="flex items-center">
				<div className="grow">
					<h1 className="text-3xl font-semibold">
						Nutritional Insights
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<p>Hello, {getEmail()}</p> |{' '}
					<button
						onClick={handleLogoutClick}
						className="p-2 bg-red-500 rounded-md cursor-pointer"
					>
						LOGOUT
					</button>
				</div>
			</div>
		</header>
	);
}
