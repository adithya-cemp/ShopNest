
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../authApi";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await authApi.get("/orders/my");
        setOrders(response.data.orders);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load your orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return (
      <section className="page-section">
        <div className="spinner"></div>
        <p className="empty-message">Loading your orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <div className="error-box">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            className="btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR SHOPPING HISTORY</p>
        <h1>My Orders</h1>
        <p>View and track all your ShopNest purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>
            You haven't placed any orders. Start shopping
            and your orders will appear here.
          </p>
          <Link to="/products" className="btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p>
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      }
                    )}
                  </p>
                </div>

                <span
                  className={`order-status status-${order.status}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-products">
                {order.items.map((item, index) => (
                  <div
                    className="order-product"
                    key={`${order._id}-${index}`}
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span>Total Amount</span>
                <strong>
                  ${Number(order.totalAmount).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyOrders;
