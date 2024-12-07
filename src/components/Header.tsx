import { Link, useNavigate } from "react-router-dom"
import { BasketIcon, Logo } from "../assets/images/icon"
import { useSelector } from "react-redux"
import { IProduct } from "../service/Products"
import { useState } from "react"
import OrderButton from "./OrderButton"
import { Input, Modal, Select } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ICategories } from "../service/Categories"
import { useAxios } from "../hooks/useAxios"
import { UploadOutlined } from "@ant-design/icons"

const Header = () => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [img, setImg] = useState<string | null>(null)
	const [size, setSize] = useState<string[] | null>(null)
	const [price, setPrice] = useState<number | null>(null)
	const queryClient = useQueryClient()
	const orderedProducts = useSelector((state: { orderList: IProduct[] }) => state.orderList)
	const totalPrice = orderedProducts.reduce((val: number, item: IProduct) => {
		val += (item.price * item.orderCount)
		return val
	}, 0)

	const { data: categoryList } = useQuery({
		queryKey: ["categorySelect"],
		queryFn: () => useAxios().get("/categories").then(res => res.data.map((item: ICategories) => ({ label: item.title, value: item.id })))
	})

	const mutation = useMutation({
		mutationFn: (data: any) => useAxios().post("/products", data),
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ["products"] })
		}
	})

	function handleSavePizza() {
		const data = {
			categoryId, name, size, price, orderCount: 0, img,
			type: ["тонкое", "традиционное"]
		}
		mutation.mutate(data)
	}
	function handleChooseImg(e: ChangeEvent) {
		const res = (e.target as HTMLInputElement).files
		if (res) {
			setImg(URL.createObjectURL(res[0]))
		}
	}

	return (
		<header className="mb-[40px]">
			<div className="flex items-center justify-between px-[55px] mb-[40px]">
				<Link className="flex items-center" to={"/"}>
					<Logo />
					<div className="ml-[17px]">
						<h1 className="text-[#181818] text-[24px] font-extrabold leading-[29px] tracking-[1%] uppercase">React Pizza</h1>
						<p className="text-[#7B7B7B] font-normal text-[16px] leading-[19px]">самая вкусная пицца во вселенной</p>
					</div>
				</Link>
				<div className="flex items-center space-x-[25px]">
					<button onClick={() => navigate("/basket")} className="w-[150px] py-[12px] flex items-center justify-center gap-[13px] rounded-[30px] bg-[#FE5F1E] cursor-pointer">
						<strong className="text-white text-[16px] font-bold leading-[19px]">{totalPrice} ₽</strong>
						<span className="inline-block w-[2px] h-[25px] bg-[#ffffff25]"></span>
						<div className="flex items-center gap-[8px]">
							<BasketIcon />
							<strong className="text-white text-[16px] font-bold leading-[19px]">{orderedProducts.length == 0 ? 0 : orderedProducts.length}</strong>
						</div>
					</button>
					<OrderButton onClick={() => setIsOpen(true)} title="Add Pizza" />
				</div>
			</div>
			<Modal className="!w-[600px]" open={isOpen} onCancel={() => setIsOpen(false)} onOk={handleSavePizza}>
				<div className="p-5 space-y-[25px]">
					<Select className="w-full" size="large" placeholder="Choose category" showSearch allowClear optionFilterProp="label" options={categoryList} onChange={(e) => setCategoryId(e)} />
					<Input className="w-full" size="large" placeholder="Enter pizza name" value={name} onChange={(e) => setName(e.target.value)} type="text" allowClear />
					<Input className="w-full" size="large" placeholder="Enter pizza price" value={price ? price : ""} onChange={(e) => setPrice(Number(e.target.value))} type="number" allowClear />
					<Select mode="tags" style={{ width: "100%" }} placeholder="Add Size" size="large" allowClear onChange={(e) => setSize(e)} options={
						[
							{ label: "26 см.", value: "26 см." },
							{ label: "30 см.", value: "30 см." },
							{ label: "40 см.", value: "40 см." }
						]} />
					<label className="mt-5 inline-block">
						<input onChange={handleChooseImg} type="file" placeholder="pizza img" className="hidden" />
						<UploadOutlined className="scale-[2] cursor-pointer" />
					</label>
				</div>
			</Modal>
			<span className="inline-block w-[100%] h-[2.5px] bg-[#F7F7F7]"></span>
		</header>
	)
}

export default Header