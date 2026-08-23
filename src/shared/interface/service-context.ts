import { Handler } from "express";
import { Role } from ".";

export interface MdlFactory {
  auth: Handler;
  allowRoles: (roles: Role[]) => Handler;
}

export type ServiceContext = {
  mdlFactory: MdlFactory;
}