import logo from './assets/brand/logo.svg'
import './App.css'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<button class="ds-btn ds-btn-xs">Button</button>
					<button class="ds-btn ds-btn-primary ds-btn-sm">Button</button>
					<button class="ds-btn ds-btn-secondary">Button</button>
					<button class="ds-btn ds-btn-accent ds-btn-lg">Button</button>
					<button class="ds-btn ds-btn-ghost">Button</button>
					<button class="ds-btn ds-btn-link">Button</button>
				</div>
			</header>
		</div>
	)
}

export default App
