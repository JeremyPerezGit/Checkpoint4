import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Scores = {
  id: number;
  user_id: number;
  time_taken: number;
  played_at: string;
};

class ScoreRepository {
  async create(scores: Omit<Scores, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO scores (user_id, time_taken)
             VALUES (?, ?)`,
      [scores.user_id, scores.time_taken],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
            FROM scores`,
    );
    return rows as Scores[];
  }

  async update(id: number, time_taken: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `UPDATE scores 
          SET time_taken = ?
          WHERE id = ?`,
      [time_taken, id],
    );

    return result.affectedRows;
  }
}

export default new ScoreRepository();
