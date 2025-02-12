import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Scoreboard.module.css";

interface Score {
  id: number;
  time_taken: number;
  user_id: number;
  username: string;
}

interface User {
  id: number;
  username: string;
  time_taken: number;
  place: number;
}

export default function Scoreboard() {
  const [scores, setScores] = useState<Score[]>([]);
  const [userScore, setUsers] = useState<User>();
  const [loading, setLoading] = useState(true);

  const fetchTop10 = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/scores/top`,
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des scores :", error);
      return [];
    }
  }, []);

  const fetchUserRank = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/scores/2`,
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fetchedScores, fetchedUsers] = await Promise.all([
          fetchTop10(),
          fetchUserRank(),
        ]);
        setScores(fetchedScores);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchTop10, fetchUserRank]);

  return (
    <section className={styles.scoreboard}>
      <h3 className={styles.title}>Classement TOP 10</h3>
      <section className={styles.score}>
        <p className={styles.rank}>Rang</p>
        <p className={styles.username}>Pseudo</p>
        <p className={styles.personalBest}>Temps</p>
      </section>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        scores.map((score, index) => (
          <section key={score.id} className={styles.score}>
            <p className={styles.rank}>{index + 1}</p>
            <p className={styles.username}>{score.username}</p>
            <p className={styles.personalBest}>{score.time_taken}s</p>
          </section>
        ))
      )}
      <section className={`${styles.score} ${styles.userScore}`}>
        <p className={styles.rank}>{userScore?.place}</p>
        <p className={styles.username}>VOUS</p>
        <p className={styles.personalBest}>{userScore?.time_taken}s</p>
      </section>
    </section>
  );
}
