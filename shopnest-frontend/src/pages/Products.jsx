import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import { api } from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("?limit=100");
        setProducts(response.data.products);

        const uniqueCategories = [
          ...new Set(response.data.products.map((product) => product.category))
        ];
        setCategories(uniqueCategories);
      } catch {
        setError(
          "Sorry, we couldn't load the products right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;

    return products.filter(
      (product) => product.category === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">OUR COLLECTION</p>
        <h1>Products</h1>
        <p>Explore our latest products and find your next favourite.</p>
      </div>

      {!loading && !error && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {loading && <div className="spinner"></div>}

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && <ProductGrid products={filteredProducts} />}
    </section>
  );
}

export default Products;