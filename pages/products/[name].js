import { fetchEntries } from "../../contentful"

const Product = ({ product }) => {
  return (
    <p>{product.name}</p>
  )
}

export const getStaticProps = async (context) => {
    const products = await fetchEntries()
  return {
    props: {
        product: products.find(product => product.name === decodeURIComponent(context.params.name))
    }
  }
}

export const getStaticPaths = async() => {
    const products = await fetchEntries()
    const paths = products.map(product => ({
        params: {name: product.name},
    }));
    return {paths, fallback: false}
}

export default Product