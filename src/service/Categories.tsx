import { useContext, useState } from "react"
import { useAxios } from "../hooks/useAxios"
import { TopArrowIcon } from "../assets/images/icon";
import { Context } from "../context/Context";
import { useQuery } from "@tanstack/react-query";

interface ICategories {
	id: string,
	title: string
}

const Categories = () => {
	const { setCategoryId } = useContext(Context)
	const [isActive, setIsActive] = useState<string>("Все")
	const [categoryText, setCategoryText] = useState<string>("")

	function categoryBtnClick(title: string, id: string): void {
		setIsActive(title)
		setCategoryId(id)
		setCategoryText(title)
	}

	const { data: categories = [] } = useQuery({
		queryKey: ["categories"],
		queryFn: () => useAxios().get("/categories").then(res => res.data)
	})

	// get => query 
	// post, put, and delete => mutation

	return (
		<div className="mb-[35px]">
			<div className="flex items-center justify-between mb-[32px]">
				<div className="flex gap-[9px]">
					{categories.map((item: ICategories) => <button onClick={() => categoryBtnClick(item.title, item.id)} key={item.id} className={`${isActive == item.title ? "bg-[#282828] text-white" : "bg-[#f9f9f9] text-[#2C2C2C]"} duration-500 py-[14px] px-[23px] cursor-pointer rounded-[30px] text-[16px] font-bold leading-[19px] tracking-[1.5%] uppercase text-center`}>{item.title}</button>)}
				</div>
				<div className="flex items-center gap-[8px]">
					<TopArrowIcon />
					<p className="text-[#2C2C2C] text-[16px] font-bold leading-[17px] tracking-[1.5%]">Сортировка по:</p>
					<span className="text-[#FE5F1E] text-[16px] font-bold leading-[17px] tracking-[1.5%]">популярности</span>
				</div>
			</div>
			<h4 className="text-[#000] text-[32px] font-bold leading-[39px] tracking-[1%]">{categoryText} пиццы</h4>
		</div>
	)
}

export default Categories
