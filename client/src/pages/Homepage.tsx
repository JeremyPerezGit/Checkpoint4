import styles from "../styles/Homepage.module.css";

export default function Homepage() {
  return (
    <section className={styles.homepage}>
      <h2>TU VEUX TESTER TES CONNAISSANCES ?</h2>
      <p>Tu dois trouver tous les noms des champions de League of Legends</p>
      <p>
        Au plus vite tu les trouves tous, au mieux tu seras placé dans le
        classement !
      </p>
      <p>Connecte toi à ton compte pour enregistrer ton score</p>
      <button type="button" className={styles.begin}>
        Commencer
      </button>
    </section>
  );
}
