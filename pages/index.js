import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { fetchEntries } from "../contentful"
import Link from "next/link";

export default function Products({ products }) {
  return (
    <ul>
      {products.map(product => (
      <li key={product.id} >
        <Link href={`/${encodeURIComponent(product.name)}`}>{product.name}</Link>
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