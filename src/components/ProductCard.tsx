import React, { SetStateAction, useState } from "react"
import { IProduct } from "../service/Products"
import { ProductCardAddIcon } from "../assets/images/icon"
import { Segmented } from 'antd'
import { useDispatch } from "react-redux"  
import OrderButton from "./OrderButton"
import { saveOrderProducts } from "../store/orderSlice"

interface IProductCard {
	item: IProduct,
	getAllProducts: IProduct[],
	setGetAllProducts: React.Dispatch<SetStateAction<IProduct[]>>
}

const ProductCard: React.FC<IProductCard> = ({ item, getAllProducts, setGetAllProducts }) => {
	const dispatch = useDispatch()
	const [type, setType] = useState<string>("тонкое")
	const [size, setSize] = useState<string>(item.size[0])

	function SegmentedOption(arr: string[]): any {
		const list = [
			{ label: "26 см.", value: "26 см.", disabled: true },
			{ label: "30 см.", value: "30 см.", disabled: true },
			{ label: "40 см.", value: "40 см.", disabled: true }
		]
		for (let i = 0; i < list.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				if (arr[j] == list[i].label) {
					list[i].disabled = false
				}
			}
		}
		return list
	}

	function handleOrderBtnClick() {
		let data = { ...item, orderCount: item.orderCount += 1 }
		setGetAllProducts(getAllProducts.map((value: IProduct) => value.id == item.id ? data : value))

		dispatch(saveOrderProducts({ ...data, type: [type], size: [size] }))
	}

	return (
		<div className="w-[300px] flex flex-col items-center">
			<img className="w-[260px] h-[260px] mb-[12px]" src={item.img} alt={item.name} width={260} height={260} />
			<h2 className="mb-[22px] text-[20px] font-extrabold leading-[24px] tracking-[1%] text-center">{item.name}</h2>
			<div className="bg-[#F3F3F3] rounded-[10px] w-[270px]">
				<Segmented<string> options={["тонкое", "традиционное"]} onChange={(e) => setType(e)} />
				<Segmented<string> options={SegmentedOption(item.size)} onChange={(e) => setSize(e)} />
			</div>
			<div onClick={handleOrderBtnClick} className="flex items-center justify-between gap-[30px] mt-[17px]">
				<strong className="text-[22px] font-bold leading-[27px] tracking-[1.5%]">от {item.price} ₽</strong>
				<OrderButton title="Добавить" leftIcon={<ProductCardAddIcon />} orderCount={item.orderCount} />
			</div>
		</div>
	)
}

export default ProductCard