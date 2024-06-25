import rocketLogo from '../assets/rocket.svg'
import styles from "../components/Header.module.css"

export default function Header() {
    return(
        <header className={styles.header}>
        <img src={rocketLogo} alt="Logo To-Do" />
        <strong><span className={styles.to}>to</span><span className={styles.do}>do</span></strong>
      </header>
    )
}