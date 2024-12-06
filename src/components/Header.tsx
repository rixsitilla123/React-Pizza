import { Link, useNavigate } from "react-router-dom"
import { BasketIcon, Logo } from "../assets/images/icon"
import { useSelector } from "react-redux"
import { IProduct } from "../service/Products"

const Header = () => {
	const navigate = useNavigate()
	const orderedProducts = useSelector((state: { orderList: IProduct[] }) => state.orderList)
	const totalPrice = orderedProducts.reduce((val: number, item: IProduct) => {
		val += (item.price * item.orderCount)
		return val
	}, 0)

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
				<button onClick={() => navigate("/basket")} className="w-[150px] py-[12px] flex items-center justify-center gap-[13px] rounded-[30px] bg-[#FE5F1E] cursor-pointer">
					<strong className="text-white text-[16px] font-bold leading-[19px]">{totalPrice} ₽</strong>
					<span className="inline-block w-[2px] h-[25px] bg-[#ffffff25]"></span>
					<div className="flex items-center gap-[8px]">
						<BasketIcon />
						<strong className="text-white text-[16px] font-bold leading-[19px]">{orderedProducts.length == 0 ? 0 : orderedProducts.length}</strong>
					</div>
				</button>
			</div>
			<span className="inline-block w-[100%] h-[2.5px] bg-[#F7F7F7]"></span>
		</header>
	)
}

export default Header
// {orderedProducts.length > 0 && orderedProducts.length}