import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { fetchEntries } from "../contentful"
import Link from "next/link";

export default function Products({ products }) {
  return (
    <>
    <header className={styles.header}>
      <h1>Promise All Shop</h1>
    </header>
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {products.map((product, i) => (
          <li key={product.id} className={`${styles.link}${i % 2 !== 0 ? ` ${styles.shaded}` : ""}`}>
              <Link href={`/${encodeURIComponent(product.name)}`}>
                <div className={styles.list_flex}>
                  <div className={styles.image_container}>
                    <img className={styles.image} src={product.image} />
                  </div>
                  {product.name}
                </div>
              </Link>
          </li>
        ))}
      </ul>
    </nav>
    </>
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