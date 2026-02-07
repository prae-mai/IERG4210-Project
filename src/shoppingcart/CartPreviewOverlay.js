import CartPreview from "./CartPreview";

function CartPreviewOverlay({ isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className="cart-preview-overlay">
			<div className="cart-preview-overlay__backdrop" onClick={onClose} />
			<div className="cart-preview-overlay__panel">
				<CartPreview onClose={onClose} />
			</div>
		</div>
	);
}

export default CartPreviewOverlay;
