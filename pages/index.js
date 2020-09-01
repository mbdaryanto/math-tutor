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
          <div className={styles.card}>
            <Link href="/addition">
              <a>
                <h3>Addition &rarr;</h3>
                <p>Test your addition</p>
              </a>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/multiplication">
              <a>
                <h3>Multiplication &rarr;</h3>
                <p>Test your multiplication</p>
              </a>
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Created by Marcel
      </footer>
    </div>
  )
}
