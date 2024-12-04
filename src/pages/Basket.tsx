import { BasketIcon, DeleteAllIcon, DeleteItemIcon } from "../assets/images/icon"
import { IProduct } from "../service/Products"
import { useDispatch, useSelector } from "react-redux"

const Basket = () => {
	const dispatch = useDispatch()
	const orderedProducts = useSelector(
		(state: { orderList: IProduct[] }) => state.orderList
	)
	const totalPrice = orderedProducts.reduce((val: number, item: IProduct) => {
		val += (item.price * item.orderCount)
		return val
	}, 0)

	return (
		<div className="w-[820px] mx-auto bg-white p-5 rounded-md">
			<div className="flex items-center justify-between mb-[30px]">
				<h2 className="flex items-center space-x-[17px] text-[#000] text-[32px] font-bold leading-[39px] tracking-[1%]">
					<BasketIcon />
					Корзина
				</h2>
				<button className="flex items-center space-x-2 text-[#B6B6B6]"><DeleteAllIcon /><span className="text-[16px] leading-[19px]" >Очистить корзину</span></button>
			</div>
			<ul>
				{orderedProducts.map((item: IProduct) => (
					<li className="flex items-center justify-between py-[30px] border-t-[1.5px] border-[#F4F4F4]" key={item.id}>
						<div className="flex items-center space-x-[15px]">
							<img src={item.img} alt="img" width={80} height={80} />
							<div>
								<h2 className="text-[#000] text-[22px] font-bold tracking-[1%] leading-[27px]">{item.name}</h2>
								<p className="text-[#8D8D8D] text-[18px] leading-[22px] font-normal tracking-[1%]">{item.type[0]} тесто, {item.size[0]}</p>
							</div>
						</div>
						<div className="flex items-center space-x-[12px]">
							<button className="w-[32px] h-[32px] rounded-[50%] border-[2px] border-[#FE5F1E] bg-white text-[#FE5F1E] flex items-center justify-center">-</button>
							<strong className="text-[#000] text-[22px] font-bold leading-[27px] tracking-[1%]">{item.orderCount}</strong>
							<button className="w-[32px] h-[32px] rounded-[50%] border-[2px] border-[#FE5F1E] bg-white text-[#FE5F1E] flex items-center justify-center">+</button>
						</div>
						<strong className="text-[#000] text-[22px] font-bold leading-[27px] tracking-[1%]">{item.price * item.orderCount} ₽</strong>
						<button onClick={() => dispatch(deleteOrderProduct(item.id))} className="w-[32px] h-[32px] bg-white text-[#D0D0D0] border-[#D0D0D0] border-[2px] rounded-[50%] flex items-center justify-center"><DeleteItemIcon /></button>
					</li>
				))}
			</ul>
			<div className="flex items-center justify-between mb-[40px]">
				<p className="text-[#000] text-[22px] font-normal leading-[27px] tracking-[1%]">Всего пицц: <strong className="font-bold">{orderedProducts.length} шт.</strong></p>
				<p className="text-[#000] text-[22px] font-normal leading-[27px] tracking-[1%]">Сумма заказа: <strong className="text-[#FE5F1E] font-bold">{totalPrice} ₽</strong></p>
			</div>
		</div>
	)
}

export default Basket