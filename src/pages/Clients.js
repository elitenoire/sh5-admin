import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../components/ClientsTable'

const headers = ['Name', 'Website', 'Email', 'Phone Number']

function Clients() {
	const [clients, setClients] = useState()

	useEffect(() => {
		axios.get('https://fakerapi.it/api/v1/companies?_quantity=10').then(response => setClients(response.data))
	}, [])

	return (
		<div>
			<h1 className="pb-4 mb-4 text-4xl lg:text-5xl font-bold border-b-2 border-base-300 dark:border-base-content/10">
				Clients
			</h1>
			{clients?.data ? (
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
