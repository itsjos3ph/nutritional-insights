import { createContext, useContext, useState } from 'react';

// Create an Auth context
const AuthContext = createContext({});

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

	const login = (username, password) => {
		// Logic to authenticate user and set current user
	};

	const logout = () => {
		// Logic to log out user and unset current user
	};

	// The value provided will be available to all components in the tree
	const value = {
		currentUser,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export { useAuthContext, AuthContextProvider };
