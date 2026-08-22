import { Handler, NextFunction, Request, Response } from "express";
import { ITokenIntrospect, Requester } from "../interface";

export function authMiddleware(
  introspector: ITokenIntrospect
): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Verify token
      const { payload, error, isOk } = await introspector.introspect(token);
      if (!isOk) {
        res.status(401).json({ error: error?.message || "Unauthorized" });
      }

      const requester = payload as Requester;

      res.locals.requester = requester;

      return next();
    } catch (error) {
      res.status(401).json({ error: (error as Error).message })
    }
  }
}