import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import unknown from "../../public/unknow.jpg";
import styles from "../styles/Game.module.css";

export default function Game() {
  const [champions, setChampions] = useState<
    { name: string; image_url: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [foundChampions, setFoundChampions] = useState(new Set());

  const fetchChampions = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/champions`,
      );
      setChampions(response.data);
    } catch (err) {
      console.error("Erreur lors du fetch des champions:", err);
    }
  }, []);

  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  useEffect(() => {
    const champion = champions.find(
      (champ) => champ.name.toLowerCase() === inputValue.toLowerCase(),
    );

    if (champion && !foundChampions.has(champion.name.toLowerCase())) {
      setFoundChampions((prev) =>
        new Set(prev).add(champion.name.toLowerCase()),
      );
      setInputValue("");
    }
  }, [inputValue, champions, foundChampions]);

  return (
    <>
      <section>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nom du champion"
          id={styles.nameInput}
        />

        <div className={styles.championsGrid}>
          {champions.map((champion) => (
            <div key={champion.name} style={{ textAlign: "center" }}>
              <img
                src={
                  foundChampions.has(champion.name.toLowerCase())
                    ? champion.image_url
                    : unknown
                }
                alt={champion.name}
                className={styles.championImg}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
