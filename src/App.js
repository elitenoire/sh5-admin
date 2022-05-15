import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProtected from './components/AuthProtected'
import { AuthProvider } from './hooks/useAuth'

import logo from './assets/brand/logo.svg'
import './App.css'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<button className="ds-btn ds-btn-xs">Button</button>
					<button className="ds-btn ds-btn-primary ds-btn-sm">Button</button>
					<button className="ds-btn ds-btn-secondary">Button</button>
					<button className="ds-btn ds-btn-accent ds-btn-lg">Button</button>
					<button className="ds-btn ds-btn-ghost">Button</button>
					<button className="ds-btn ds-btn-link">Button</button>
				</div>
			</header>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/login" element={<p>Login Route!</p>} />
						<Route element={<AuthProtected isAllowed />}>
							<Route path="/" element={<p>Dashboard Layout</p>}>
								<Route index element={<p>Dashboard</p>} />
								<Route path="dashboard/*" element={<p>Dashboard</p>} />
								<Route path="products/*" element={<p>Products</p>} />
								<Route path="customers/*" element={<p>Customers</p>} />
								<Route path="team/*" element={<p>Team Members</p>} />
								<Route path="*" element={<p>Not Found</p>} />
							</Route>
						</Route>
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	)
}

export default App
