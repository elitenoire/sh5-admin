import logo from './assets/brand/logo.svg'
import './App.css'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<button class="btn">Button</button>
					<button class="btn btn-primary">Button</button>
					<button class="btn btn-secondary">Button</button>
					<button class="btn btn-accent">Button</button>
					<button class="btn btn-ghost">Button</button>
					<button class="btn btn-link">Button</button>
				</div>
			</header>
		</div>
	)
}

export default App
