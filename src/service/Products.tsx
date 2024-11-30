import { useContext } from "react"
import { useAxios } from "../hooks/useAxios"
import ProductCard from "../components/ProductCard"
import { Context } from "../context/Context"
import { useQuery } from "@tanstack/react-query"

export interface IProduct {
	id: string,
	categoryId: string,
	img: string,
	name: string,
	type: string[],
	size: string[],
	price: number,
	orderCount: number
}

const Products = () => {
	const { categoryId } = useContext(Context)

	const { data: products = [] } = useQuery({
		queryKey: ["products", categoryId],
		queryFn: () => useAxios().get("/products", { params: { categoryId } }).then(res => res.data)
	})

	return (
		<div className="flex flex-wrap justify-between gap-[35px]">
			{products.map((item: IProduct) => <ProductCard item={item} key={item.id} />)}
		</div>
	)
}

export default Products
