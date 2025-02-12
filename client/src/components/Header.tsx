import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <section className={styles.header}>
      <h1>Guess LoL Champs</h1>
      <NavLink className={styles.scoreboard} to="/">
        Classement
      </NavLink>
      <NavLink className={styles.connect} to="/login">
        Connexion
      </NavLink>
    </section>
  );
}
