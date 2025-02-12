import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Users = {
  id: number;
  username: string;
  email: string;
  password: string;
};

class UserRepository {
  async create(users: Omit<Users, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO users (username, email, password)
             VALUES (?, ?, ?)`,
      [users.username, users.email, users.password],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
            FROM users`,
    );
    return rows as Users[];
  }

  async readOne(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
            FROM users 
            WHERE id = ?`,
      [id],
    );
    return rows[0] as Users;
  }

  async update(
    id: number,
    username: string,
    email: string,
    password: string,
  ): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `UPDATE users 
          SET username = ?, email = ?, password = ? 
          WHERE id = ?`,
      [username, email, password, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM users 
          WHERE id = ?`,
      [id],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
