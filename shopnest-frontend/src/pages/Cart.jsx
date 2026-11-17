
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, subtotal, tax, total } = useCart();

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn">
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR SELECTIONS</p>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="summary-card">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-line total-line">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <Link to="/checkout" className="btn checkout-btn">
            Proceed to Checkout
          </Link>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
