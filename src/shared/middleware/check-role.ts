import { Handler, NextFunction, Request, Response } from "express";
import { Requester, Role } from "../interface";

export function allowRoles(roles: Role[]): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.requester) {
      res.status(401).json({ error: "Unauthorized "});
      return;
    }

    const requester = res.locals.requester as Requester;

    if (roles.indexOf(requester.role) === -1) {
      res.status(403).json({ error: "Forbidden"});
      return;
    }
    
    next();
  }
}