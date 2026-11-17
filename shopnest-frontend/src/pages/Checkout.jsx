
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../authApi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const placeOrder = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      navigate("/products");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const items = cart.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: Number(item.price)
      }));

      const response = await authApi.post("/orders", { items });

      setOrder(response.data.order);
      clearCart();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to place your order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    return (
      <section className="page-section">
        <div className="empty-cart">
          <div className="empty-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you, {user?.name}.</p>
          <p>Order ID: {order._id}</p>
          <p>Order Total: ${Number(order.totalAmount).toFixed(2)}</p>
          <p>Status: {order.status}</p>
          <button className="btn" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">ALMOST THERE</p>
        <h1>Checkout</h1>
      </div>

      <div className="summary-card">
        <h2>Order Summary</h2>

        <p>Customer: {user?.name}</p>
        <p>Email: {user?.email}</p>

        {cart.map((item) => (
          <div className="summary-line" key={item.id}>
            <span>{item.title} × {item.quantity}</span>
            <span>
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="summary-line total-line">
          <strong>Order Total</strong>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          className="btn checkout-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </section>
  );
}

export default Checkout;
