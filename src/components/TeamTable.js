import { More } from 'iconsax-react'

function TeamTable({ headers = [], body = [] }) {
	return (
		<div className="overflow-x-auto w-full">
			<table className="ds-table ds-table-dark w-full">
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" className="ds-checkbox ds-checkbox-primary" />
							</label>
						</th>
						{headers?.map((heading, id) => (
							<th key={`th-${id}-${heading}`}>{heading}</th>
						))}
						<th />
					</tr>
				</thead>
				<tbody>
					{body?.map((row = {}, id) => (
						<tr key={`tr-${id}-${row.id}`} className="ds-hover">
							<th>
								<label>
									<input type="checkbox" className="ds-checkbox ds-checkbox-primary" />
								</label>
							</th>
							<td>
								<div className="flex items-center space-x-3">
									<div className="ds-avatar">
										<div className="ds-mask ds-mask-squircle w-12 h-12">
											<img src={row.image} alt={row.firstname} />
										</div>
									</div>
									<div>{`${row.firstname} ${row.lastname}`}</div>
								</div>
							</td>
							<td>{row.gender}</td>
							<td>{row.email}</td>
							<td>{row.phone}</td>
							<th>
								<button title="View more" className="ds-btn ds-btn-pastel ds-btn-circle">
									<More variant="TwoTone" className="w-7 h-7" />
								</button>
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TeamTable
