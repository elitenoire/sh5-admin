function Countdown() {
	return (
		<div className="flex-1 pb-6">
			<h2 className="text-lg font-bold mb-3">Reminder</h2>
			<div className="ds-stack w-full">
				<div className="rounded-3xl p-6 text-center bg-primary dark:bg-neutral/70 text-primary-content dark:text-neutral-content">
					<p className="font-semibold text-md">New Product Launch</p>
					<div className="grid grid-flow-col gap-2 mt-4 mb-2 auto-cols-max justify-evenly">
						<div className="flex flex-col">
							<span className="ds-countdown font-mono font-bold text-2xl rounded-xl py-3 px-2 bg-white/10 dark:bg-neutral-focus">
								<span style={{ '--value': 15 }}></span>
							</span>
							days
						</div>
						<div className="flex flex-col">
							<span className="ds-countdown font-mono font-bold text-2xl rounded-xl py-3 px-2 bg-white/10 dark:bg-neutral-focus">
								<span style={{ '--value': 10 }}></span>
							</span>
							hours
						</div>
						<div className="flex flex-col">
							<span className="ds-countdown font-mono font-bold text-2xl rounded-xl py-3 px-2 bg-white/10 dark:bg-neutral-focus">
								<span style={{ '--value': 24 }}></span>
							</span>
							min
						</div>
						<div className="flex flex-col">
							<span className="ds-countdown font-mono font-bold text-2xl rounded-xl py-3 px-2 bg-white/10 dark:bg-neutral-focus">
								<span style={{ '--value': 47 }}></span>
							</span>
							sec
						</div>
					</div>
					<progress className="ds-progress ds-progress-success w-56" value="40" max="100"></progress>
				</div>
				<div className="rounded-3xl p-6 bg-primary dark:bg-neutral/70"></div>
				<div className="rounded-3xl p-6 bg-primary dark:bg-neutral/70"></div>
			</div>
		</div>
	)
}

export default Countdown
