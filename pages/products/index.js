import { fetchEntries } from "../../contentful"
import Link from "next/link";

const Products = ({ products }) => {
  return (
    <ul>
      {products.map(product => (
      <li key={product.id} >
        <Link href={`/products/${encodeURIComponent(product.name)}`}>{product.name}</Link>
      </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async () => {
    const products = await fetchEntries()
  return {
    props: {
        products
    }
  }
}

export default Products