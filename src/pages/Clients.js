import { useEffect } from 'react'
import NotFound from '../components/NotFound'
import Loading from '../components/Loading'
import Table from '../components/ClientsTable'

import { useAxios } from '../hooks/useAxios'

const headers = ['Name', 'Website', 'Email', 'Phone Number']

function Clients() {
	const { response: clients, error, loading, axiosFetch } = useAxios()

	useEffect(() => {
		axiosFetch({
			url: 'https://fakerapi.it/api/v1/companies?_quantity=10',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h1 className="pb-4 mb-4 text-4xl lg:text-5xl font-bold border-b-2 border-base-300 dark:border-base-content/10">
				Clients
			</h1>
			{loading && <Loading page />}
			{!loading && error && <NotFound error={error} />}
			{!loading && !error && clients?.data ? (
				<>
					<p className="text-right mb-4">
						Total: <span className="font-bold text-primary">{clients.total}</span>
					</p>
					<Table headers={headers} body={clients.data} />
				</>
			) : null}
		</div>
	)
}

export default Clients
