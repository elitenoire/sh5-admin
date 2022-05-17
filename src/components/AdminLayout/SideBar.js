import { NavLink } from 'react-router-dom'
import { Category2, Tag2, People, UserSquare, LogoutCurve, Moon, Sun1 } from 'iconsax-react'
import { useDarkMode } from '../DarkMode'
import { ReactComponent as LogoSvg } from '../../assets/brand/logo.svg'

function SideBar({ toggle }) {
	const { darkMode, toggle: toggleDarkMode } = useDarkMode()

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center md:justify-center lg:justify-start py-1.5 px-4">
				<span className="w-[3.25rem] h-[3.25rem] p-3 rounded-full bg-primary text-primary-content">
					<LogoSvg className="fill-current" />
				</span>
				<span className="text-3xl sm:text-3xl font-semibold uppercase ml-3 md:hidden lg:inline">
					SH<span className="text-primary">5</span>
				</span>
			</div>
			<nav>
				<ul className="ds-menu p-4 gap-3 border-t border-base-300 dark:border-base-content/10">
					<li>
						<NavLink
							to="/dashboard"
							className="ds-btn-pastel border-0 rounded-box font-medium md:flex-col lg:flex-row gap-y-1"
							onClick={toggle}
						>
							<Category2 className="w-7 h-7" variant="TwoTone" />
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/products"
							className="ds-btn-pastel border-0 rounded-box font-medium md:flex-col lg:flex-row gap-y-1"
							onClick={toggle}
						>
							<Tag2 className="w-7 h-7" variant="TwoTone" />
							Products
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/customers"
							className="ds-btn-pastel border-0 rounded-box font-medium md:flex-col lg:flex-row gap-y-1"
							onClick={toggle}
						>
							<People className="w-7 h-7" variant="TwoTone" />
							Customers
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/team"
							className="ds-btn-pastel border-0 rounded-box font-medium md:flex-col lg:flex-row gap-y-1"
							onClick={toggle}
						>
							<UserSquare className="w-7 h-7" variant="TwoTone" />
							Team
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="mt-auto p-4 gap-3 flex flex-col md:flex-row lg:flex-col justify-between border-t border-base-300 dark:border-base-content/10">
				<button
					onClick={toggleDarkMode}
					className="ds-btn ds-btn-pastel ds-btn-block md:ds-btn-circle lg:ds-btn-block justify-between md:justify-center lg:justify-between lg:px-4 rounded-box lg:rounded-box"
				>
					<span className="md:hidden lg:inline">
						<span className="opacity-50">Dark Mode: </span>
						{darkMode ? 'On' : 'Off'}
					</span>
					<span className={`ds-swap ds-swap-rotate${darkMode ? ' ds-swap-active' : ''}`}>
						<Sun1 className="ds-swap-off w-7 h-7" />
						<Moon className="ds-swap-on w-7 h-7" />
					</span>
				</button>
				<button
					onClick={toggle}
					className="ds-btn ds-btn-outline ds-btn-block md:ds-btn-circle lg:ds-btn-block lg:px-4 gap-2 rounded-box lg:rounded-box text-left"
				>
					<span className="flex flex-col  flex-1 md:hidden lg:flex">
						<span className="opacity-50">Log Out</span>
						<span>admin@demo.com</span>
					</span>
					<LogoutCurve variant="TwoTone" className="w-7 h-7" />
				</button>
			</div>
		</div>
	)
}

export default SideBar
