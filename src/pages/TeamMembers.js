import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../components/TeamTable'

const headers = ['Name', 'Gender', 'Email', 'Phone Number']

function TeamMembers() {
	const [team, setTeam] = useState()

	useEffect(() => {
		axios.get('https://fakerapi.it/api/v1/persons?_quantity=10').then(response => setTeam(response.data))
	}, [])

	return (
		<div>
			<h1 className="pb-4 mb-4 text-4xl lg:text-5xl font-bold border-b-2 border-base-300 dark:border-base-content/10">
				Team Members
			</h1>
			{team?.data ? (
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
