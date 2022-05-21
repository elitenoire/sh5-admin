import { currencyFormatter } from '../utils'
function ProductCard({ product }) {
	return (
		<div className="ds-card w-full max-w-xs mx-auto bg-base-100 dark:bg-neutral/50 hover:shadow-lg hover:shadow-primary/10  dark:shadow-neutral/90 transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
			<figure className="px-2 pt-2">
				<img src={product.image} alt={product.name} className="rounded-xl" />
			</figure>
			<div className="ds-card-body gap-1 p-6">
				<h2 className="ds-card-title mb-2 leading-tight">{product.name}</h2>
				<p className="flex justify-between items-center">
					<span className="">Net Price:</span>
					<span className="">{currencyFormatter(product.net_price)}</span>
				</p>
				<p className="flex justify-between items-center">
					<span className="">Taxes:</span>
					<span className="">{currencyFormatter(product.taxes)}</span>
				</p>
				<p className="flex justify-between items-center text-lg">
					<span className="font-medium">Price:</span>
					<span className="font-medium text-primary">{currencyFormatter(product.price)}</span>
				</p>
			</div>
		</div>
	)
}

export default ProductCard
