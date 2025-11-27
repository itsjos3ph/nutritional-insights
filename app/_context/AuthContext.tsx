import { createContext, useContext, useState } from 'react';

interface AuthContextType {
	login: (email: string, password: string) => Promise<boolean | undefined>;
	logout: (email: string) => Promise<boolean | undefined>;
	verifyLogin: (email: string) => Promise<number | undefined>;
	register: (email: string, password: string) => Promise<boolean | undefined>;
}

// Create an Auth context
const AuthContext = createContext<AuthContextType>({
	login: async () => true,
	logout: async () => true,
	verifyLogin: async () => 0,
	register: async () => true,
});

// Create a custom hook that uses the Auth context
function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

// Create a Provider component for the Auth context
function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	async function login(email: string, password: string) {
		const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`;
		const data = {
			email,
			password,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			if (result.status == 'success') {
				localStorage.setItem('Z-USER-ACCOUNT', email);
				return true;
			} else {
				return false;
			}
		} catch (error: any) {
			console.error(error.message);
		}
	}

	async function logout(email: string) {
		const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`;
		const data = {
			email,
			password: '',
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			if (result.status == 'success') {
				localStorage.removeItem('Z-USER-ACCOUNT');
				return true;
			} else {
				return false;
			}
		} catch (error: any) {
			console.error(error.message);
		}
	}

	async function verifyLogin(email: string) {
		const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verifyLogin`;
		const data = {
			email,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			return result.isLoggedIn;
		} catch (error: any) {
			console.error(error.message);
		}
	}

	async function register(email: string, password: string) {
		const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`;
		const data = {
			email,
			password,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			if (result.status == 'success') {
				return true;
			} else {
				return false;
			}
		} catch (error: any) {
			console.error(error.message);
		}
	}

	// The value provided will be available to all components in the tree
	const value = {
		login,
		logout,
		register,
		verifyLogin,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export { useAuthContext, AuthContextProvider };
