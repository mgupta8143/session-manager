import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h2>Welcome to Session Manager.</h2>
      </div>
      <div className={styles.buttonWrapper}>
        <Link href={'/join/' + "hello"}>
          <a className={styles.joinAnchor}>Create Session</a>
        </Link>
      </div>
    </div>
  );
}
