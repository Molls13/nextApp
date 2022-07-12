import { fetchEntries } from "../../contentful"

const Product = ({ product }) => {
  return (
    <>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.quantity}</p>
    </>
  )
}

export const getStaticProps = async (context) => {
  const products = await fetchEntries()
  const product = products.find(product => product.name === decodeURIComponent(context.params.name))
  const quantity = await fetch(`/.netlify/functions/getQuantity?id=${product.id}`)
  return {
    props: {
      product: {
        ...product,
        quantity
      }
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