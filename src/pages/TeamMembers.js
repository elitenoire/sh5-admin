import { useEffect } from 'react'
import NotFound from '../components/NotFound'
import Loading from '../components/Loading'
import Table from '../components/TeamTable'

import { useAxios } from '../hooks/useAxios'

const headers = ['Name', 'Gender', 'Email', 'Phone Number']

function TeamMembers() {
	const { response: team, error, loading, axiosFetch } = useAxios()

	useEffect(() => {
		axiosFetch({
			url: 'https://fakerapi.it/api/v1/persons?_quantity=10',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h1 className="pb-4 mb-4 text-4xl lg:text-5xl font-bold border-b-2 border-base-300 dark:border-base-content/10">
				Team Members
			</h1>
			{loading && <Loading page />}
			{!loading && error && <NotFound error={error} />}
			{!loading && !error && team?.data ? (
				<>
					<p className="text-right mb-4">
						Total: <span className="font-bold text-primary">{team.total}</span>
					</p>
					<Table headers={headers} body={team.data} />
				</>
			) : null}
		</div>
	)
}

export default TeamMembers
