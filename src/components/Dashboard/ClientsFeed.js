import { More } from 'iconsax-react'
import { useEffect } from 'react'
import NotFound from '../../components/NotFound'
import Loading from '../../components/Loading'

import { useAxios } from '../../hooks/useAxios'

function FeedItem({ item, now }) {
	return (
		<a href="/#" className="flex flex-wrap items-center ds-btn-pastel">
			<div className="ds-avatar">
				<div className="ds-mask ds-mask-squircle w-10 h-10">
					<img src={item.image} alt={item.name} />
				</div>
			</div>
			<span className="flex-1 ml-1 truncate">{item.name}</span>
			{now && <span className="ds-badge ds-badge-sm ds-badge-info">New</span>}
		</a>
	)
}

function ClientsFeed() {
	const { response: clients, error, loading, axiosFetch } = useAxios()

	useEffect(() => {
		axiosFetch({
			url: 'https://fakerapi.it/api/v1/companies?_quantity=10',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="bg-base-100 shadow-2xl shadow-primary/10 dark:shadow-none dark:bg-neutral/50 rounded-3xl">
			<div className="sticky top-0 flex justify-between items-center px-6 pt-6 pb-4 border-b border-accent-content/10 dark:border-base-content/10">
				<h2 className="text-lg font-bold">Latest Clients</h2>
				<span className="ds-btn ds-btn-sm ds-btn-circle ds-btn-pastel">
					<More variant="TwoTone" />
				</span>
			</div>
			<div className="overflow-y-auto no-scrollbar h-80 rounded-b-[inherit]">
				{loading && <Loading />}
				{!loading && error && <NotFound error={error} />}
				{!loading && !error && clients?.data ? (
					<ul className="ds-menu rounded-b-[inherit]">
						{clients.data.map((client, id) => (
							<li key={`fi-${id}-${client.id}`}>
								<FeedItem item={client} now={id < 3} />
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	)
}

export default ClientsFeed
