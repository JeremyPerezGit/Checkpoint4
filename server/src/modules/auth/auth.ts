// import express from "express";
// import argon2 from "argon2";
// import jwt from "jsonwebtoken";
// import { client } from "../../../database/client";

// const router = express.Router();
// const SECRET_KEY = process.env.APP_SECRET || "super_secret"; // 🔒 Stocke ça dans un fichier .env

// // Inscription
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ error: "Veuillez fournir un username et un mot de passe." });
//   }

//   try {
//     const hashedPassword = await argon2.hash(password);

//     const result = await pool.query(
//       "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
//       [username, hashedPassword],
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// // 📌 Connexion
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE username = $1", [
//       username,
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(400).json({ error: "Utilisateur introuvable" });
//     }

//     const validPassword = await argon2.verify(user.rows[0].password, password);

//     if (!validPassword) {
//       return res.status(400).json({ error: "Mot de passe incorrect" });
//     }

//     const token = jwt.sign({ userId: user.rows[0].id }, SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// export default router;
