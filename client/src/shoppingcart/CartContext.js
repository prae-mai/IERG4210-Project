import { createContext, useReducer, useEffect } from "react";
import { initialCartState } from "./cartState";
import { cartReducer } from "./cartReducer";
import { loadCartState, saveCartState } from "./cartPersistence";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
	const [cartState, dispatch] = useReducer(
		cartReducer,
		initialCartState,
		(initial) => loadCartState() ?? initial,
	);

	// persist on change
	useEffect(() => {
		saveCartState(cartState);
	}, [cartState]);

	return (
		<CartContext.Provider value={{ cartState, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}
