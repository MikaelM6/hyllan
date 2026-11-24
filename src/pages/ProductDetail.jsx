import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchJson } from "../api.js";
import { formatPrice } from "../utils/formatPrice.js";
import ProductGrid from "../components/ProductGrid.jsx";
import Loading from "../components/Loading.jsx";
import styles from "./ProductDetail.module.css";
import ReviewList from "../components/ReviewList.jsx";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const data = await fetchJson(`/products/${id}`);
      setProduct(data);

      // Hämta några andra produkter i samma kategori
      const similarData = await fetchJson(
        `/products/category/${data.category}?limit=5`
      );
      const others = similarData.products.filter((p) => p.id !== data.id);
      setSimilar(others.slice(0, 4));
    }

    getProduct();
  }, []);

  if (!product) return <Loading />;

  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock < 10;

  return (
    <article>
      <Link to="/products" className={styles.back}>
        ← Tillbaka till produkter
      </Link>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <img
            src={product.images[0]}
            alt={product.title}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.rating}>
            Betyg: {product.rating} ({product.reviews.length} recensioner)
          </p>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          {outOfStock ? (
            <p className={styles.stock}>Slut i lager</p>
          ) : lowStock ? (
            <p className={styles.stock} style={{ color: "orange" }}>
              Endast {product.stock} kvar!
            </p>
          ) : (
            <p className={styles.stock}>I lager</p>
          )}

          <button 
          className="button" 
          onClick={() => addToCart(product)}
          disabled={outOfStock}
          >
            Lägg i varukorgen
          </button>

          <ul className={styles.facts}>
            <li>Leverans: {product.shippingInformation}</li>
            <li>Garanti: {product.warrantyInformation}</li>
            <li>Returer: {product.returnPolicy}</li>
          </ul>
        </div>
      </div>

      <section className={styles.similar}>
        <h2>Liknande produkter</h2>
        <ProductGrid products={similar} />
      </section>
    </article>
  );
}

export default ProductDetail;
