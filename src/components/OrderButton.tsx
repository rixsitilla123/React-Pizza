import React, { ReactNode } from "react"

interface IButton {
	orderClass?: string,
	title: string,
	leftIcon?: ReactNode,
	orderCount?: number
}

const OrderButton: React.FC<IButton> = ({ orderClass, title, leftIcon, orderCount }) => {
	return (
		<button className={`${orderClass} group orderBtn flex items-center gap-[8px] py-[12px] px-[18px] rounded-[30px] bg-[#FE5F1E] border-[1.5px] border-[#FE5F1E] duration-500 hover:bg-white text-white hover:text-[#FE5F1E]`}>
			{leftIcon}
			<span className="text-[16px] font-bold leading-[19px]">{title}</span>
			{orderCount && orderCount > 0 ? <span className="circleSpan w-[22px] h-[22px] flex items-center justify-center rounded-[50%] p-[5px] text-[13px] font-bold leading-[16px] border-[1px] border-white">{orderCount}</span> : null}
		</button>
	)
}

export default OrderButton