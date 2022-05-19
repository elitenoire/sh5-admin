import { TaskSquare, ChartCircle, ReceiptEdit, MoneySend } from 'iconsax-react'

function Action({ icon, children }) {
	return (
		<button className="ds-btn ds-btn-link h-auto p-0 decoration-transparent">
			<span className="flex flex-col gap-4">
				<span className="p-4 rounded-2xl bg-primary/10 transition-transform duration-300 hover:-translate-y-1">
					{icon}
				</span>
				<span className="text-base-content">{children}</span>
			</span>
		</button>
	)
}
function QuickAction() {
	return (
		<div className="flex-1">
			<h2 className="text-lg font-bold mb-3">Quick Actions</h2>
			<div className="flex flex-wrap flex-1 gap-4 justify-between">
				<Action icon={<MoneySend variant="TwoTone" className="w-8 h-8" />}>Accounts</Action>
				<Action icon={<ChartCircle variant="TwoTone" className="w-8 h-8" />}>Analysis</Action>
				<Action icon={<TaskSquare variant="TwoTone" className="w-8 h-8" />}>Task</Action>
				<Action icon={<ReceiptEdit variant="TwoTone" className="w-8 h-8" />}>Invoice</Action>
			</div>
		</div>
	)
}

export default QuickAction
