import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

export const createValidationMiddleware = (schema: Schema) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
