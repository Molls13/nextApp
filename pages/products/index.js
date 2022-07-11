import { fetchEntries } from "../../contentful"

function Products({ products }) {
  return (
    <>
      {products.map(product => <p key={product.id}>{product.name}</p>)}
    </>
  )
}

export async function getStaticProps() {
  const products = await fetchEntries()
  return {
    props: {
      products,
    },
  }
}

export default Products