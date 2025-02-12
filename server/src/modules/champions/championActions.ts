import type { RequestHandler } from "express";
import championRepository from "./championRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const champion = await championRepository.readAll();

    res.json(champion);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, image_url } = req.body;

    if (!name || !image_url) {
      res.status(400).json({ message: "Tous les champs sont requis." });
      return;
    }

    const newChampion = await championRepository.create({ name, image_url });
    res.status(201).json(newChampion);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const champion = {
      id: Number(req.params.id),
      name: req.body.name,
      image_url: req.body.image_url,
    };

    const affectedRows = await championRepository.update(
      champion.id,
      champion.name,
      champion.image_url,
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const championId = Number(req.params.id);
    await championRepository.delete(championId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit, destroy };
