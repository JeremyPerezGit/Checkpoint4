import type { RequestHandler } from "express";
import scoreRepository from "./scoreRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const score = await scoreRepository.readAll();

    res.json(score);
  } catch (err) {
    next(err);
  }
};

const readTopTen: RequestHandler = async (req, res, next) => {
  try {
    const score = await scoreRepository.readTopTen();
    res.json(score);
  } catch (err) {
    next(err);
  }
};

const readUserPlace: RequestHandler = async (req, res, next) => {
  try {
    const user_id = Number(req.params.id);
    const score = await scoreRepository.readUserPlace(user_id);
    res.json(score);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { user_id, time_taken } = req.body;

    if (!user_id || !time_taken) {
      res.status(400).json({ message: "Tous les champs sont requis." });
      return;
    }

    const insertId = await scoreRepository.create({
      user_id,
      time_taken,
      played_at: new Date().toISOString(),
    });

    res.status(204).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const score = {
      id: Number(req.params.id),
      time_taken: req.body.time_taken,
    };

    const affectedRows = await scoreRepository.update(
      score.id,
      score.time_taken,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, readTopTen, readUserPlace, add, edit };
