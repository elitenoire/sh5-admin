import StatsBoard from '../components/Dashboard/StatsBoard'
import QuickAction from '../components/Dashboard/QuickAction'
import Countdown from '../components/Dashboard/Countdown'

function Dashboard() {
	return (
		<div>
			<StatsBoard />
			<div className="grid lg:grid-cols-[1fr_auto] my-12 gap-y-6 gap-x-2">
				<div className="lg:col-start-2">
					<div className="flex flex-col xs:flex-row flex-wrap justify-between lg:max-w-[18rem] gap-y-6 gap-x-12">
						<QuickAction />
						<Countdown />
					</div>
				</div>
				<div className="lg:row-start-1 lg:row-end-3 text-3xl bg-info h-48">2</div>
				<div className="text-3xl bg-warning h-48">3</div>
			</div>
		</div>
	)
}

export default Dashboard
