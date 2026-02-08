/* eslint-disable max-len */
import { pluralize } from "../utils/pluralize";

const ENGLISH = {
	GRAMMAR: {
		AND: "and",
		OR: "or",
		MORE: "more",
	},

	GENERAL: {
		YES: "Yes",
		NO: "No",
		CANCEL: "Cancel",
		SUBMIT: "Submit",
		QUANTITY: "Quantity",
		TOTAL: "Total",
	},

	CART: {
		SHORT_TITLE: "Cart",
		TITLE: "Shopping Cart",
		EMPTY: "Your shopping cart is empty.",
		PRICE_PER_ITEM: "Price per item",
		VIEW_FULL_CART: "View full cart",
		MORE_ITEMS: (count) =>
			`...and ${pluralize(count, "more item", "more items")}`,
		ACTIONS: {
			VIEW_FULL: "View full cart",
			CHECKOUT: "Checkout",
			CANCEL_CHECKOUT: "Cancel checkout",
			CLEAR: "Clear cart",
			UPDATE: "Update",
			REMOVE: "Remove",
			CANCEL_CHECKOUT: "Cancel checkout"
		},
		STATUS: {
			UNLOCKED: "Your cart is unlocked and can be modified.",
			LOCKED: "Your cart is locked for checkout. To unlock, go to your Shopping Cart and cancel checkout.",
			CHECKOUT_SUCCESSFUL: "Checkout successful.",
		},
		ERROR: {
			INVALID_QUANTITY: "Invalid quantity.",
			EMPTY_ON_CHECKOUT:
				"Your cart is empty. Add items before checking out.",
		},
	},
};

export default ENGLISH;