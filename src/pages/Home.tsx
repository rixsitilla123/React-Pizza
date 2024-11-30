import Header from "../components/Header"
import Categories from "../service/Categories"
import Products from "../service/Products"

const Home = () => {
	return (
		<div className="rounded-[10px] pt-[52px] pb-[96px] bg-white shadow-[0_15px_20px_0_rgba(0,0,0,0.03)]">
			<Header basketTotalPrice={520} basketCount={3} />
			<div className="px-[55px]">
				<Categories />
				<Products />
			</div>
		</div>
	)
}

export default Home