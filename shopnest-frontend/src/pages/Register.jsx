
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../authApi";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.post("/auth/register", {
        name,
        email,
        password
      });

      login(response.data);
      navigate("/checkout");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">

        {/* LEFT VISUAL SECTION */}
        <div className="auth-visual">
          <div className="auth-visual-content">

            <div className="auth-brand">
              Shop<span>Nest</span>
            </div>

            <div className="auth-illustration">
              🎁
            </div>

            <h2>
              Join <span>ShopNest!</span>
            </h2>

            <p className="auth-visual-description">
              Create your account and discover a world
              of amazing products, great deals and
              convenient shopping.
            </p>

            <div className="auth-benefits">
              <div className="auth-benefit">
                <span className="auth-benefit-icon">🛍️</span>
                <span>Explore Amazing Products</span>
              </div>

              <div className="auth-benefit">
                <span className="auth-benefit-icon">💳</span>
                <span>Easy Shopping Experience</span>
              </div>

              <div className="auth-benefit">
                <span className="auth-benefit-icon">🚚</span>
                <span>Convenient Order Tracking</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT REGISTRATION FORM */}
        <div className="auth-form-panel">
          <div className="auth-form-card">

            <div className="auth-form-heading">
              <span className="auth-label">
                CREATE ACCOUNT
              </span>

              <h1>Join ShopNest</h1>

              <p>
                Create your account to start shopping with us.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>

              {error && (
                <p className="auth-error">{error}</p>
              )}

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <label htmlFor="password">
                Password
              </label>

              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?
              <Link to="/login">Login here</Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Register;
