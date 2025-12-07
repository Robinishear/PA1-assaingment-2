import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      users?: JwtPayload;
    }
  }
}

export type Role = {
  admin: "admin";
  customer: "customer";
};
