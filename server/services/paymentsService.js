import Stripe from "stripe";
import { CURRENCY } from "../config/paymentConfig.js";

function getStripe() {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error(
			"STRIPE_SECRET_KEY is not set in environment variables",
		);
	}

	return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function createCheckoutSession({ order }) {
	const stripe = getStripe();

	const session = await stripe.checkout.sessions.create({
		mode: "payment",

		line_items: order.itemsWithPrice.map((item) => ({
			price_data: {
				currency: CURRENCY,
				product_data: {
					name: `Product ${item.pid}`,
				},
				unit_amount: Math.round(item.price * 100),
			},
			quantity: item.quantity,
		})),

		metadata: {
			orderId: String(order.orderId),
			digest: order.digest,
		},

		success_url: `${process.env.CLIENT_URL}/orders?success=true`,
		cancel_url: `${process.env.CLIENT_URL}/shopping-cart?cancelled=true`,
	});

	return session;
}
