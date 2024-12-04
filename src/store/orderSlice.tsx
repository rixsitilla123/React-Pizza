import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../service/Products";

interface InitialStateType {
	orderList: IProduct[]
}

const initialState: InitialStateType = {
	orderList: []
}

export const orderSlice = createSlice({
	name: "orderSlice",
	initialState,
	reducers: {
		saveOrderProducts: (state: InitialStateType, action: PayloadAction<IProduct>) => {
			const id = state.orderList.findIndex((item: IProduct) => item.id == action.payload.id)
			if (id == -1) {
				return {
					orderList: [...state.orderList, action.payload]
				}
			} else {
				state.orderList.splice(id, 1, action.payload)
			}
		},
		deleteOrderProduct: (state: InitialStateType, action: PayloadAction<string>) => {
			const id = state.orderList.findIndex(item => item.id == action.payload)
			state.orderList.splice(id, 1)
		}
	}
})