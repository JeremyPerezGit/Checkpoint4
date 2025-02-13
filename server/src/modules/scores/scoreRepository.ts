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
      FROM scores
      ORDER BY time_taken ASC`,
    );
    return rows as Scores[];
  }

  async readTopTen() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT s.* , u.username
      FROM scores  AS s
      LEFT JOIN users AS u
      ON s.user_id = u.id
      ORDER BY time_taken ASC
      LIMIT 10`,
    );
    return rows;
  }

  async readUserPlace(user_id: number) {
    const [score] = await databaseClient.query<Rows>(
      `SELECT * 
      FROM scores
      WHERE user_id = ?
      ORDER BY time_taken
      LIMIT 1`,
      [user_id],
    );

    if (!score.length) {
      return { score: null, place: null };
    }

    const [place] = await databaseClient.query<Rows>(
      `SELECT COUNT(*) +1 AS place
      FROM scores
      WHERE time_taken < ?`,
      [score[0].time_taken],
    );
    return { ...score[0], place: place[0].place };
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
