import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function Products() {
	const [products, setProducts] = useState()

	useEffect(() => {
		axios.get('https://fakerapi.it/api/v1/products?_quantity=10').then(response => setProducts(response.data))
	}, [])

	console.log({ products })
	return (
		<div>
			<h1 className="pb-4 mb-4 text-4xl lg:text-5xl font-bold border-b-2 border-base-300 dark:border-base-content/10">
				Products
			</h1>
			{products?.data ? (
				<>
					<p className="text-right mb-4">
						Total: <span className="font-bold text-primary">{products.total}</span>
					</p>
					<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
						{products.data.map((product, id) => (
							<ProductCard key={`p${id}-${product?.id}`} product={product} />
						))}
					</div>
				</>
			) : null}
		</div>
	)
}

export default Products
