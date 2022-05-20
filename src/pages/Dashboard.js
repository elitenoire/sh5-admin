import StatsBoard from '../components/Dashboard/StatsBoard'
import QuickAction from '../components/Dashboard/QuickAction'
import Countdown from '../components/Dashboard/Countdown'
import ClientsFeed from '../components/Dashboard/ClientsFeed'
import BestSellers from '../components/Dashboard/BestSellers'

import LineChart from '../components/Charts/LineChart'
import BarChart from '../components/Charts/BarChart'

function Dashboard() {
	return (
		<div>
			<StatsBoard />
			<div className="grid lg:grid-cols-[1fr_auto] my-12 gap-y-12 gap-x-8">
				<div className="lg:col-start-2">
					<div className="flex flex-col xs:flex-row flex-wrap justify-between lg:max-w-[18rem] gap-12">
						<QuickAction />
						<Countdown />
					</div>
				</div>
				<div className="flex flex-col lg:row-start-1 lg:row-end-3 min-w-0 gap-y-12">
					<div className="h-72">
						<LineChart />
					</div>
					<div className="flex">
						<div className="h-72 w-full mb-6">
							<BarChart />
						</div>
					</div>
					<BestSellers />
				</div>
				<div className="lg:max-w-[18rem]">
					<ClientsFeed />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
