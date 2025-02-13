import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <section className={styles.header}>
      <NavLink to="/">
        <h1>Guess LoL Champs</h1>
      </NavLink>
      <NavLink className={styles.scoreboard} to="/scoreboard">
        Classement
      </NavLink>
      <NavLink className={styles.connect} to="/login">
        Connexion
      </NavLink>
    </section>
  );
}
