import styles from '../styles/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          졸지마(ZZM) 프로젝트
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Team ZZM
          </a>
        </div>
      </div>

      <div className={styles.center}>
        환영합니다!
      </div>

      <div className={styles.grid}>
        <a
          href="/cam"
          className={styles.card}
        >
          <h2>
            Camera <span>-&gt;</span>
          </h2>
          <p>졸지마(ZZM) 카메라 시작하기</p>
        </a>

        <a
          href="/about"
          className={styles.card}
        >
          <h2>
            About <span>-&gt;</span>
          </h2>
          <p>
            Team ZZM 소개
          </p>
        </a>
      </div>
    </main>
  )
}
