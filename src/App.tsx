import rocketLogo from './assets/rocket.svg'
import styles from './App.module.css'
import './global.css'

export default function App() {
  return (
   <div>
    <header className={styles.header}>
      <img src={rocketLogo} alt="Logo To-Do" />
      <strong><span>to</span><span>do</span></strong>
    </header>

   </div>
  )
}

