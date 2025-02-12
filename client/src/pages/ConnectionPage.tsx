import styles from "../styles/ConnectionPage.module.css";

export default function ConnectionPage() {
  return (
    <section className={styles.container}>
      <section className={styles.connection}>
        <section className={styles.create}>
          <h3 className={styles.title}>Créer un compte</h3>
          <section className={styles.form}>
            <section className={styles.username}>
              <p>Pseudo</p>
              <input type="text" placeholder="mot de passe" />
            </section>
            <section className={styles.email}>
              <p>Adresse email</p>
              <input type="email" placeholder="email" />
            </section>
            <section className={styles.password}>
              <p>Mot de passe</p>
              <input type="password" placeholder="mot de passe" />
            </section>
            <button type="submit" className={styles.button}>
              Créer un compte
            </button>
          </section>
        </section>
        <section className={styles.connect}>
          <h3 className={styles.title}>Connexion</h3>
          <section className={styles.form}>
            <section className={styles.username}>
              <p>Pseudo</p>
              <input type="text" placeholder="pseudo" />
            </section>
            <section className={styles.password} id={styles.password}>
              <p>Mot de passe</p>
              <input type="password" placeholder="mot de passe" />
            </section>
            <button type="submit" className={styles.button}>
              Connexion
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
