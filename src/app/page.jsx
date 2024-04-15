import { Yeseva_One } from "next/font/google"
import styles from './page.module.css';
import Image from "next/image";

const yeseva_One = Yeseva_One({
  weight: ["400"],
  styles: ["italic", "normal"],
  subsets: ["latin"],
})

export default function HomePage() {
  return (
    <div className={yeseva_One.className}>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <span className={styles.span}>Bienvenido</span>
          <h1 className={styles.title}>Todo List con MongoDB</h1>
          <Image
            width={433}
            height={117}
            src="/images/MongoDB_Logo.png"
            alt="Book"
          />
        </div>
      </div>

    </div>
  );
}