import { EmojiSad } from 'iconsax-react'

function NotFound() {
	return (
		<div className="h-full flex flex-col justify-center items-center gap-y-4">
			<h1 className="text-3xl font-semibold text-error">Oops!</h1>
			<EmojiSad variant="Bold" className="w-24 h-24" />
			<p className="text-lg">Nothing found here.</p>
			{/* <div className="min-h-screen w-10 bg-orange-900"></div> */}
		</div>
	)
}

export default NotFound
