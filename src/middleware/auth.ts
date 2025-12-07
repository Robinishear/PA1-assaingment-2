import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
    //

    // console.log(authHeader, token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access Denied: No token provided" });
    }
    try {
      const decoded = JWT.verify(
        token,
        config.SECRET_JWT as string
      ) as JwtPayload;

      req.users = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
