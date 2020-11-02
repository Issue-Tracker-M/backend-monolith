import { Request, Response } from "express";
import { Comment } from "../../../models/Task";

export const createComments = (req: Request, res: Response): void => {
  const { content, author } = req.body;

  const newComment = new Comment({
    content,
    author,
  });

  newComment
    .save()
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
