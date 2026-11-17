
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img src={product.thumbnail} alt={product.title} />
      </Link>

      <div className="product-info">
        <p className="category-label">{product.category}</p>

        <Link to={`/products/${product._id}`} className="product-title">
          {product.title}
        </Link>

        <div className="rating">
          ★ {Number(product.rating || 0).toFixed(1)}
        </div>

        <div className="price-row">
          <strong>${Number(product.price).toFixed(2)}</strong>
        </div>

        <button className="btn add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
