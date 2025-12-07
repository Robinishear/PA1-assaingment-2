import { NextFunction, Request, Response } from "express";

const timeLogger = (req: Request, res: Response, next: NextFunction) => {
    
  const time = new Date().toISOString();
  console.log(`${time} ${req.method} ${req.originalUrl}`);
  next();
};

export default timeLogger;
