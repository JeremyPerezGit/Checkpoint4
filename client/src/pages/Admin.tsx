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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingId !== null) {
      setChampions(
        champions.map((champion) =>
          champion.id === editingId
            ? { ...champion, [e.target.name]: e.target.value }
            : champion,
        ),
      );
    }
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      try {
        const championToUpdate = champions.find(
          (champ) => champ.id === editingId,
        );
        if (championToUpdate) {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/champions/${editingId}`,
            championToUpdate,
          );
          setNewChampion({ name: "", image_url: "" });
          setIsAdding(false);
          setEditingId(null); // Optionnel : Quitter le mode édition
          fetchChampions();
        }
      } catch (err) {
        console.error("Erreur lors de la modification du champion:", err);
      }
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
              <form className={styles.editForm} onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="name"
                  value={champion.name}
                  onChange={handleEditChange}
                  id={styles.championNameEdit}
                />
                <input
                  type="text"
                  name="image_url"
                  value={champion.image_url}
                  onChange={handleEditChange}
                  id={styles.championImgEdit}
                />
                <button type="submit" className={styles.saveButton}>
                  Enregistrer
                </button>
                <button
                  type="button"
                  className={styles.abortButton}
                  onClick={() => setEditingId(null)}
                >
                  Annuler
                </button>
              </form>
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
