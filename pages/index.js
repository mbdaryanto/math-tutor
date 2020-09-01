import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Math Tutor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>       
        <h1 className={styles.title}>
          Welcome to Math Tutor
        </h1>

        <p className={styles.description}>
          Select a Course
        </p>

        <div className={styles.grid}>
          
          <Link href="/addition">
            <a className={styles.card}>
              <h3>Addition &rarr;</h3>
              <p>Test your addition</p>
            </a>
          </Link>

          <Link href="/subtraction">
            <a className={styles.card}>
              <h3>Subtraction &rarr;</h3>
              <p>Test your subtraction</p>
            </a>
          </Link>

          <Link href="/multiplication">
            <a className={styles.card}>
              <h3>Multiplication &rarr;</h3>
              <p>Test your multiplication</p>
            </a>
          </Link>
  
        </div>
      </main>

      <footer className={styles.footer}>
        Created by Marcel
      </footer>
    </div>
  )
}
