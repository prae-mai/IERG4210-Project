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
		EDIT: "Edit",
		SAVE: "Save",
		SUBMIT: "Submit",
		DELETE: "Delete",
		QUANTITY: "Quantity",
		TOTAL: "Total",
		ID: "ID",
		CATEGORY: "Category",
		IMAGE: "Image",
		NAME: "Name",
		PRICE: "Price",
		DESCRIPTION: "Description",
		ACTIONS: "Actions",
		NEW: "New",
	},

	REQUIRED: {
		NAME: "Name is required.",
		CATEGORY: "Category is required.",
		DESCRIPTION: "Description is required.",
		IMAGE: "Image is required.",
	},

	PRODUCT: {
		NOT_FOUND: "Product not found.",
		INVALID_VIEW: "Invalid product view.",
		PRICE_MUST_BE_POSITIVE: "Price must be a positive number.",
		FAILED_CREATE: "Failed to create product.",
		FAILED_IMAGE_UPLOAD: "Failed to upload image.",
		ADD_NEW: "Add new product.",
	},

	CATEGORY: {
		SELECT: "Select category.",
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
			ADD: "Add to cart",
			UPDATE_QUANTITY: "Update quantity",
			CHECKOUT: "Checkout",
			CANCEL_CHECKOUT: "Cancel checkout",
			CLEAR: "Clear cart",
			UPDATE: "Update",
			REMOVE: "Remove",
			CANCEL_CHECKOUT: "Cancel checkout",
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