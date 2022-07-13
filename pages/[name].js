import { useState, useEffect } from "react"
import { fetchEntries } from "../contentful"
import styles from '../styles/Home.module.css'
const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(null)
  useEffect(() => {
    const abortController = new AbortController();
    const getAndSet = async () => {
      try {
        const response = await fetch(
          `https://promise-all-266538.netlify.app/.netlify/functions/getQuantity?id=${product.id}`,
          {
            signal: abortController.signal
          }
        );
        const { quantity } = await response.json();
        setQuantity(quantity);
      } catch(e) {
        console.log(e)
      }
    };
    getAndSet();
    return () => abortController.abort()
  }, [])
  const handleBuy = async () => {
    setQuantity(null);
    const response = await fetch(`/api/products/${product.id}`, { method: 'POST' });
    const { newQuantity } = await response.json()
    setQuantity(newQuantity)
  }
  return (
    <div className={styles.product_container}>
      <img className={styles.productImg} src={product.image}/>
      <div className={styles.productInfo}>
        <p className={`${styles.text} ${styles.product_name}`}>{product.name}</p>
        <p className={`${styles.text} ${styles.product_price}`}>{product.price}kr</p>
        <p className={`${styles.text} ${styles.product_description}`}>{product.description}</p>
        <p className={`${styles.text} ${styles.product_quantity} ${quantity === null ? "" : quantity === 0 ? styles.oos : quantity <= 10 ? styles.lowstock : styles.stock}`}>{quantity === null ? "Loading..." : quantity === 0 ? "Out of stock" : `${quantity} in stock`}</p>
        <button className={styles.button} onClick={handleBuy} disabled={!quantity}>Buy now</button>
      </div>
    </div>
  )
}

export const getStaticProps = async (context) => {
  const products = await fetchEntries()
  const product = products.find(product => product.name === decodeURIComponent(context.params.name))
  return {
    props: {
      product
    }
  }
}

export const getStaticPaths = async () => {
  const products = await fetchEntries()
  const paths = products.map(product => ({
    params: { name: product.name },
  }));
  return { paths, fallback: false }
}

export default Product