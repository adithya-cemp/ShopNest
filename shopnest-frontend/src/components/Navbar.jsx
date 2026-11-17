
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        Shop<span>Nest</span>
      </NavLink>

      <nav>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>

        <NavLink to="/products" className={getLinkClass}>
          Products
        </NavLink>

        <NavLink to="/contact" className={getLinkClass}>
          Contact
        </NavLink>

        <NavLink to="/cart" className={getLinkClass}>
          Cart <span className="cart-badge">{cartCount}</span>
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/my-orders" className={getLinkClass}>
              My Orders
            </NavLink>

            <span className="nav-link">
              Hi, {user?.name}
            </span>

            <button
              type="button"
              className="nav-link"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={getLinkClass}>
              Login
            </NavLink>

            <NavLink to="/register" className={getLinkClass}>
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
