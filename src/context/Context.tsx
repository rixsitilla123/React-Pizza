import React, { createContext, ReactNode, SetStateAction, useState } from "react";
interface IContext {
	categoryId: string | null,
	setCategoryId: React.Dispatch<SetStateAction<null | string>>
}
export const Context = createContext<IContext>({
	categoryId: null,
	setCategoryId: () => ""
})
export const ProdcutsContext: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [categoryId, setCategoryId] = useState<string | null>(null)
	return (
		<Context.Provider value={{ categoryId, setCategoryId }}>{children}</Context.Provider>
	)
}