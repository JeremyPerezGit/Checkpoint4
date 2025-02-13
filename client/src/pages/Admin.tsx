import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Admin.module.css";

type Champion = {
  id: number;
  name: string;
  image_url: string;
};

export default function Admin() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [newChampion, setNewChampion] = useState({ name: "", image_url: "" });

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

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChampion({ ...newChampion, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/champions`,
        newChampion,
      );
      setNewChampion({ name: "", image_url: "" });
      setIsAdding(false);
      fetchChampions();
    } catch (err) {
      console.error("Erreur lors de l'ajout du champion:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/champions/${id}`);
      fetchChampions();
    } catch (err) {
      console.error("Erreur lors de la suppression du champion:", err);
    }
  };

  return (
    <section className={styles.adminPage}>
      <h3>Admin</h3>
      <p id={styles.champs}>
        Champions <span id={styles.championsNumber}>{champions.length}</span>
      </p>
      <section className={styles.addSection}>
        {isAdding && (
          <form className={styles.addForm} onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="name"
              value={newChampion.name}
              onChange={handleAddChange}
              placeholder="Nom du champion"
              id={styles.championName}
            />
            <input
              type="text"
              name="image_url"
              value={newChampion.image_url}
              onChange={handleAddChange}
              placeholder="Image du champion"
              id={styles.championImg}
            />
            <button type="submit" id={styles.addChampionButton}>
              Enregistrer
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          id={styles.addButton}
        >
          {isAdding ? "Annuler" : "+ Ajouter"}
        </button>
      </section>
      <section className={styles.editSection}>
        {champions.map((champion) => (
          <section key={champion.id} className={styles.championsList}>
            {editingId === champion.id ? (
              <>
                <input type="text" defaultValue={champion.name} />
                <input type="text" defaultValue={champion.image_url} />
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={() => setEditingId(null)}
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  className={styles.abortButton}
                  onClick={() => setEditingId(null)}
                >
                  Annuler
                </button>
              </>
            ) : (
              <>
                <p>{champion.name}</p>
                <p>{champion.image_url}</p>
                <button
                  type="button"
                  id={styles.editButton}
                  onClick={() => setEditingId(champion.id)}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  id={styles.deleteButton}
                  onClick={() => handleDelete(champion.id)}
                >
                  Supprimer
                </button>
              </>
            )}
          </section>
        ))}
      </section>
    </section>
  );
}
