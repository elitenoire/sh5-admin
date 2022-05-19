import { RaceBy, Ring } from '@uiball/loaders'
// import { usePortal } from '../hooks/usePortal'

// export function PageLoading() {
// 	const Portal = usePortal(document.querySelector('title'))
// 	return (
// 		<Portal>
// 			<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-neutral/20 text-primary">
// 				<RaceBy size={120} lineWeight={5} speed={1.4} color="currentColor" />
// 			</div>
// 		</Portal>
// 	)
// }

function Loading({ page }) {
	if (page) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-neutral/20 text-primary">
				<RaceBy size={120} lineWeight={8} speed={1.4} color="currentColor" />
			</div>
		)
	}
	return (
		<div className="flex h-full items-center justify-center text-primary">
			<Ring size={60} lineWeight={5} speed={2.5} color="currentColor" />
		</div>
	)
}

export default Loading
