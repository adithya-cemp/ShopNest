import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page-section not-found">
      <h1>404</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">Go Home</Link>
    </section>
  );
}

export default NotFound;