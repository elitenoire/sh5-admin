import { useCallback, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { HambergerMenu } from 'iconsax-react'

import TopBar from './TopBar'
import SideBar from './SideBar'

function AdminLayout() {
	const drawerCheckboxRef = useRef()

	const close = useCallback(() => {
		if (!drawerCheckboxRef.current) return
		drawerCheckboxRef.current.checked = false
	}, [])

	return (
		<div className="ds-drawer md:auto-cols-[max-content_auto]">
			<input ref={drawerCheckboxRef} id="sidebar-toggle" type="checkbox" className="ds-drawer-toggle" />
			<main className="ds-drawer-content flex flex-col items-center md:h-auto md:!col-start-2">
				<TopBar>
					<label
						htmlFor="sidebar-toggle"
						className="ds-btn ds-btn-pastel ds-btn-circle ds-drawer-button lg:hidden"
					>
						<HambergerMenu variant="TwoTone" className="w-7 h-7" />
					</label>
				</TopBar>
				<div className="w-full flex-1 bg-base-200 py-6 px-3 xs:px-6">
					<Outlet />
				</div>
			</main>
			<aside className="ds-drawer-side md:overflow-y-auto bg-base-100 border-r border-transparent md:border-base-300 dark:md:border-base-content/10">
				<label htmlFor="sidebar-toggle" className="ds-drawer-overlay md:visible">
					Main Menu
				</label>
				<div className="md:!translate-x-0 bg-inherit w-full max-w-[15rem] md:w-36 lg:w-60 lg:max-w-none">
					<SideBar close={close} />
				</div>
			</aside>
		</div>
	)
}
export default AdminLayout
