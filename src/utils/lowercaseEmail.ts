import { Request, Response, NextFunction } from "express";

export const lowercaseEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  next();
};
