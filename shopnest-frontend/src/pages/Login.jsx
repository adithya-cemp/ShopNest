
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../authApi";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Login() {
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
      const response = await authApi.post("/auth/login", {
        email,
        password
      });

      login(response.data);
      navigate("/checkout");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
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
              🛍️
            </div>

            <h2>
              Welcome <span>Back!</span>
            </h2>

            <p className="auth-visual-description">
              Sign in to continue your shopping journey
              and discover products you'll love at ShopNest.
            </p>

            <div className="auth-benefits">
              <div className="auth-benefit">
                <span className="auth-benefit-icon">🚚</span>
                <span>Fast & Reliable Delivery</span>
              </div>

              <div className="auth-benefit">
                <span className="auth-benefit-icon">🔒</span>
                <span>Secure Shopping Experience</span>
              </div>

              <div className="auth-benefit">
                <span className="auth-benefit-icon">🎧</span>
                <span>Customer Support</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="auth-form-panel">
          <div className="auth-form-card">

            <div className="auth-form-heading">
              <span className="auth-label">
                ACCOUNT LOGIN
              </span>

              <h1>Login to ShopNest</h1>

              <p>
                Enter your email and password to access your account.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>

              {error && (
                <p className="auth-error">{error}</p>
              )}

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
                  placeholder="Enter your password"
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
                {loading ? "Logging in..." : "Login →"}
              </button>

            </form>

            <p className="auth-switch">
              Don't have an account?
              <Link to="/register">Register here</Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Login;
