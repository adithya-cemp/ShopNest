import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/${id}`);
        setProduct(response.data);
      } catch {
        setError("Product not found. Please return to the products page.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="page-section">
        <div className="spinner"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <div className="error-box">
          <p>{error}</p>
          <Link to="/products" className="btn">Back to Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="detail-card">
        <div className="detail-image">
          <img src={product.images?.[0] || product.thumbnail} alt={product.title} />
        </div>

        <div className="detail-content">
          <p className="category-label">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating">★ {product.rating.toFixed(1)}</div>
          <h2>${product.price.toFixed(2)}</h2>
          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <span>Brand: {product.brand || "ShopNest"}</span>
            <span>Stock: {product.stock}</span>
          </div>

          <button className="btn add-detail-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;