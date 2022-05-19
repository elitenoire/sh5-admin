function ProductCard({ product }) {
	return (
		<div className="ds-card w-full max-w-xs mx-auto bg-base-100 dark:bg-neutral/50">
			<figure className="px-2 pt-2">
				<img src={product.image} alt={product.name} className="rounded-xl" />
			</figure>
			<div className="ds-card-body">
				<h2 className="ds-card-title">{product.name}</h2>
				<p className="flex justify-between items-center">
					<span className="">Net Price:</span>
					<span className="">{`$${product.net_price}`}</span>
				</p>
				<p className="flex justify-between items-center">
					<span className="">Taxes:</span>
					<span className="">{`$${product.taxes}`}</span>
				</p>
				<p className="flex justify-between items-center text-lg">
					<span className="font-medium">Price:</span>
					<span className="font-medium text-primary">{`$${product.price}`}</span>
				</p>
			</div>
		</div>
	)
}

export default ProductCard
