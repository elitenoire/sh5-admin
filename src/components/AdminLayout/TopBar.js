import { useLocation } from 'react-router-dom'
import { SearchNormal1, Notification, LogoutCurve } from 'iconsax-react'
import { useAuth } from '../../hooks/useAuth'
import { ReactComponent as LogoSvg } from '../../assets/brand/logo.svg'

function getCurrentRoute(path) {
	if (path === '/') return 'home'
	const cr = path.split('/').splice(1)
	return cr[0]
}

function TopBar({ children }) {
	const { user, logout } = useAuth()
	const { pathname } = useLocation()
	const path = getCurrentRoute(pathname)
	return (
		<header className="ds-navbar bg-base-100 border-b border-base-300 dark:border-base-content/10 justify-between px-2">
			<div className="">
				<div className="md:hidden">{children}</div>
				<div className="flex items-center">
					<span className="w-10 h-10 mx-2 md:hidden text-primary">
						<LogoSvg className="fill-current" />
					</span>
					<span className="text-3xl sm:text-3xl font-semibold uppercase">
						<span className="lg:hidden">
							SH<span className="text-primary">5 </span>
						</span>
						<span className="hidden sm:inline">ADMIN</span>
					</span>
					<span className="hidden lg:flex items-center text-lg opacity-75 px-2 uppercase">
						<span className="text-2xl opacity-50 ml-1 mr-2"> / </span>
						{path}
					</span>
				</div>
			</div>
			<div className="">
				<button className="ds-btn ds-btn-pastel ds-btn-circle">
					<SearchNormal1 variant="TwoTone" className="w-7 h-7" />
				</button>
				<button className="ds-btn ds-btn-pastel ds-btn-circle hidden md:inline-flex">
					<div className="ds-indicator">
						<Notification variant="TwoTone" className="w-7 h-7" />
						<span className="ds-indicator-item ds-badge ds-badge-xs ds-badge-primary"></span>
					</div>
				</button>
				<div className="ds-dropdown ds-dropdown-end ml-2">
					<label tabIndex="0" className="ds-btn ds-btn-link ds-btn-circle ds-avatar flex w-14 h-14">
						<div className="p-0.5 bg-base-100 ds-mask ds-mask-squircle">
							<img
								src="https://api.lorem.space/image/face?w=150&h=150&hash=24935"
								alt="avatar"
								className="ds-mask ds-mask-squircle"
							/>
						</div>
					</label>
					<div
						tabIndex="0"
						className="mt-3 ds-card ds-card-compact ds-dropdown-content w-56 bg-base-100 shadow"
					>
						<div className="ds-card-body text-right gap-0">
							<span className="opacity-75">You're logged in as:</span>
							<span className="font-medium text-lg truncate">{user?.email || 'admin@demo.com'}</span>
							<div className="ds-card-actions mt-2">
								<button onClick={logout} className="ds-btn ds-btn-primary ds-btn-block justify-between">
									Log out
									<LogoutCurve variant="TwoTone" className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default TopBar
