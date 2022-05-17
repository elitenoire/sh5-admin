import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProtected from './components/AuthProtected'
import AdminLayout from './components/AdminLayout'
import NotFound from './components/NotFound'
import { DarkMode } from './components/DarkMode'
import { AuthProvider } from './hooks/useAuth'

import './App.css'

function App() {
	return (
		<DarkMode>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/login" element={<p>Login Route!</p>} />
						<Route element={<AuthProtected isAllowed />}>
							<Route path="/" element={<AdminLayout />}>
								<Route index element={<p>Dashboard</p>} />
								<Route path="dashboard/*" element={<p>Dashboard</p>} />
								<Route path="products/*" element={<p>Products</p>} />
								<Route path="customers/*" element={<p>Customers</p>} />
								<Route path="team/*" element={<p>Team Members</p>} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Route>
					</Routes>
				</AuthProvider>
			</Router>
		</DarkMode>
	)
}

export default App
