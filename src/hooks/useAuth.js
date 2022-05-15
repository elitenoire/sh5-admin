import { createContext, useContext, useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSessionStorage } from './useSessionStorage'

const AuthContext = createContext()

export const AuthProvider = ({ key = 'sh5-admin-user', children }) => {
	const [user, setUser] = useSessionStorage(key, null)
	const navigate = useNavigate()
	const { state } = useLocation()
	const path = state?.from?.pathname || '/'

	// call this function when you want to authenticate the user
	const login = useCallback(
		async data => {
			setUser(data)
			navigate(path)
		},
		[navigate, setUser, path]
	)

	// call this function to sign out logged in user
	const logout = useCallback(() => {
		setUser(null)
		navigate('/login', { replace: true })
	}, [navigate, setUser])

	const value = useMemo(
		() => ({
			user,
			login,
			logout,
		}),
		[user, login, logout]
	)
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
