import { More } from 'iconsax-react'
import { useEffect } from 'react'
import NotFound from '../../components/NotFound'
import Loading from '../../components/Loading'

import { useAxios } from '../../hooks/useAxios'

import { currencyFormatter } from '../../utils'

const headers = ['No', 'ID', 'Name', 'Sold', 'Income', 'Status']

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const Sales = [...Array(10).keys()].map(i => getRandomNumber(80, 360))

function Table({ headers, body }) {
	return (
		<div className="overflow-x-auto w-full">
			<table className="ds-table ds-table-zebra ds-table-compact ds-table-dark w-full">
				<thead>
					<tr>
						{headers?.map((heading, id) => (
							<th key={`th-${id}-${heading}`}>{heading}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{body?.map((row, i) => (
						<tr key={`bs-${i}-${row.id}`} className="ds-hover ds-btn-pastel">
							<th>{i + 1}</th>
							<td>{`#856${row.id}`}</td>
							<td>
								<div className="flex items-center space-x-3">
									<div className="ds-avatar">
										<div className="ds-mask ds-mask-squircle w-12 h-12">
											<img src={row.image} alt={row.name} />
										</div>
									</div>
									<div className="">{`${row.name}`}</div>
								</div>
							</td>
							<td>{Sales[i]}</td>
							<td>{currencyFormatter(Sales[i] * parseInt(row.price))}</td>
							<td>
								<span
									className={`ds-badge ds-badge-sm ds-badge-outline ds-badge-${
										Sales[i] < 300 ? 'success' : 'ghost'
									}`}
								>
									{Sales[i] < 300 ? 'In stock' : 'Out of stock'}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function BestSellers() {
	const { response: products, error, loading, axiosFetch } = useAxios()

	useEffect(() => {
		axiosFetch({
			url: 'https://fakerapi.it/api/v1/products?_quantity=6',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-bold mb-3">Top Selling Products</h2>
				<span className="ds-btn ds-btn-sm ds-btn-circle ds-btn-pastel">
					<More variant="TwoTone" />
				</span>
			</div>
			<div className="min-h-16">
				{loading && <Loading />}
				{!loading && error && <NotFound error={error} />}
				{!loading && !error && products?.data ? <Table headers={headers} body={products.data} /> : null}
			</div>
		</div>
	)
}

export default BestSellers
