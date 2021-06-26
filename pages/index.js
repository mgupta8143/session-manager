import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2,9);
  }

  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h2>Welcome to Session Manager.</h2>
      </div>
      <div className={styles.buttonWrapper}>
        <Link href={'/join/' + generateRandomId()}>
          <a className={styles.joinAnchor}>Create Session</a>
        </Link>
      </div>
    </div>
  );
}
