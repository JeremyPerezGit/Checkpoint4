import express from "express";

const router = express.Router();

// Users-related routes
import usersActions from "./modules/users/userActions";

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.put("/api/users/:id", usersActions.edit);
router.post("/api/users", usersActions.add);
router.delete("/api/users/:id", usersActions.destroy);

/* ************************************************************************* */

// Scores-related routes
import scoreActions from "./modules/scores/scoreActions";

router.get("/api/scores", scoreActions.browse);
router.get("/api/scores/top", scoreActions.readTopTen);
router.get("/api/scores/:id", scoreActions.readUserPlace);
router.put("/api/scores/:id", scoreActions.edit);
router.post("/api/scores", scoreActions.add);

/* ************************************************************************* */

// Champions-related routes
import championActions from "./modules/champions/championActions";

router.get("/api/champions", championActions.browse);
router.put("/api/champions/:id", championActions.edit);
router.post("/api/champions", championActions.add);
router.delete("/api/champions/:id", championActions.destroy);

/* ************************************************************************* */

export default router;
