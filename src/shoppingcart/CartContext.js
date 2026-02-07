import { createContext, useReducer } from "react";
import { initialCartState } from "./cartState";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
	const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

	return (
		<CartContext.Provider value={{ cartState, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}
