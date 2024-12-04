import { useContext, useEffect, useState } from "react"
import { useAxios } from "../hooks/useAxios"
import ProductCard from "../components/ProductCard"
import { Context } from "../context/Context"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

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
	const orderedList = useSelector((state: { orderList: IProduct[] }) => state.orderList)

	const { data: products = [] } = useQuery({
		queryKey: ["products", categoryId],
		queryFn: () => useAxios().get("/products", { params: { categoryId } }).then(res => res.data)
	})

	const [getAllProducts, setGetAllProducts] = useState<IProduct[]>(products)
	useEffect(() => setGetAllProducts(products), [products])

	return (
		<div className="flex flex-wrap justify-between gap-[35px]">
			{getAllProducts.map((item: IProduct) => <ProductCard item={item} key={item.id} getAllProducts={getAllProducts} setGetAllProducts={setGetAllProducts} />)}
		</div>
	)
}

export default Products
