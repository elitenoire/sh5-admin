import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function AuthProtected({ isAllowed }) {
	const { user } = useAuth()
	const location = useLocation()

	return isAllowed || user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default AuthProtected
