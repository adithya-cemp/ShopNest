import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">WELCOME TO SHOPNEST</p>
        <h1>Everything you need, <span>all in one place.</span></h1>
        <p>
          Discover quality products at great prices. Browse our collection
          and find something you'll love.
        </p>
        <Link to="/products" className="btn hero-btn">Shop Now</Link>
      </div>

      <div className="hero-card">
        <div className="hero-icon">🛍️</div>
        <h2>Smart Shopping</h2>
        <p>Simple. Fast. Convenient.</p>
      </div>
    </section>
  );
}

export default Home;