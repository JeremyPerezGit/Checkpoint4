import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Champions = {
  id: number;
  name: string;
  image_url: string;
};

class ChampionRepository {
  async create(champions: Omit<Champions, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO champions (name, image_url)
             VALUES (?, ?)`,
      [champions.name, champions.image_url],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
      FROM champions
      ORDER BY name ASC`,
    );
    return rows as Champions[];
  }

  async update(id: number, name: string, image_url: string): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `UPDATE champions 
          SET name = ?, image_url = ? 
          WHERE id = ?`,
      [name, image_url, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM champions 
          WHERE id = ?`,
      [id],
    );

    return result.affectedRows;
  }
}

export default new ChampionRepository();
