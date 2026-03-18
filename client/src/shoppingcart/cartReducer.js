import { CART_ACTIONS, CART_LIMITS } from "../config/shoppingCartConfig";
import { initialCartState } from "./cartState";

export function cartReducer(state, action) {
	if (
		state.isCheckoutLocked &&
		[
			CART_ACTIONS.SET_QUANTITY,
			CART_ACTIONS.REMOVE_ITEM,
			CART_ACTIONS.CLEAR_CART,
		].includes(action.type)
	) {
		return state;
	}

	switch (action.type) {
		case CART_ACTIONS.SET_QUANTITY: {
			const { product, quantity } = action.payload;

			if (
				typeof quantity !== "number" ||
				quantity < CART_LIMITS.MIN_QUANTITY_PER_ITEM ||
				quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM
			) {
				return state;
			}

			const existingItemIndex = state.items.findIndex(
				(item) => item.productId === product.id,
			);

			if (existingItemIndex !== -1) {
				const updatedItems = [...state.items];
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity,
				};
				return { ...state, items: updatedItems };
			}

			return {
				...state,
				items: [
					...state.items,
					{
						productId: product.id,
						name: product.name,
						category: product.categoryName,
						thumbnail: product.thumbnail,
						priceSnapshot: product.price,
						quantity,
						addedAt: new Date().toISOString(),
					},
				],
			};
		}

		case CART_ACTIONS.REMOVE_ITEM: {
			const { productId } = action.payload;

			return {
				...state,
				items: state.items.filter(
					(item) => item.productId !== productId,
				),
			};
		}

		case CART_ACTIONS.CLEAR_CART:
			return {
				...initialCartState,
			};

		case CART_ACTIONS.LOCK_CART:
			return {
				...state,
				isCheckoutLocked: true,
			};

		case CART_ACTIONS.UNLOCK_CART:
			return {
				...state,
				isCheckoutLocked: false,
			};

		default:
			return state;
	}
}
