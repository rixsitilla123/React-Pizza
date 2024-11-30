import React from "react"
import { IProduct } from "../service/Products"
import { ProductCardAddIcon } from "../assets/images/icon"
import { Segmented } from 'antd';

const ProductCard: React.FC<{ item: IProduct }> = ({ item }) => {

	// function SegmentedOption(arr:string[]):any {
	// 	const list = [
	// 		{label: "26 см.", disabled: true},
	// 		{label: "30 см.", disabled: true},
	// 		{label: "40 см.", disabled: true}
	// 	]
	// 	const result = list.map(item => {
	// 		arr.forEach(item2 => item.label.includes(item2) ?  {label: item.label, disabled: false} : {label: item.label, disabled: true}) 
	// 	})
	// 	return result
	// }

	return (
		<div className="w-[300px] flex flex-col items-center">
			<img className="w-[260px] h-[260px] mb-[12px]" src={item.img} alt={item.name} width={260} height={260} />
			<h2 className="mb-[22px] text-[20px] font-extrabold leading-[24px] tracking-[1%] text-center">{item.name}</h2>
			<div className="bg-[#F3F3F3] rounded-[10px] w-[270px]">
				<Segmented<string> options={item.type} />
				<Segmented<{ label: string, value: string, disabled: boolean }> options={[{ label: "26 см.", value: "26 см.", disabled: false }, { label: "30 см.", value: "30 см.", disabled: true }, { label: "40 см.", value: "40 см.", disabled: false }]} />
			</div>
			<div className="flex items-center justify-between gap-[30px] mt-[17px]">
				<strong className="text-[22px] font-bold leading-[27px] tracking-[1.5%]">от {item.price} ₽</strong>
				<button className="productCardAddBtn flex items-center gap-[8px] py-[12px] px-[18px] rounded-[30px] bg-[#FE5F1E] border-[1.5px] border-[#FE5F1E] duration-500 hover:bg-white hover:text-[#FE5F1E] text-[16px] font-bold leading-[19px] text-white">
					<ProductCardAddIcon />
					Добавить
					<span className="w-[22px] h-[22px] flex items-center justify-center rounded-[50%] p-[5px] text-white text-[13px] font-bold leading-[16px] border-[1px] border-white]">{item.orderCount}</span>
				</button>
			</div>
		</div>
	)
}

export default ProductCard