import { useState, useEffect } from "react"
import { fetchEntries } from "../../contentful"

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(null)
  useEffect(() => {
    const abortController = new AbortController();
    const getAndSet = async () => {
      console.log(product.id)
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
    const { quantity } = await fetch(`/api/products/${product.id}`, { method: 'POST' });
    setQuantity(quantity)
  }
  return (
    <>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{quantity === null ? "Loading..." : quantity}</p>
      <button onClick={handleBuy}>Buy 1</button>
    </>
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