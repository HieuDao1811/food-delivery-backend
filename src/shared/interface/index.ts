import type { PagingDTO } from "../model/paging.js";

// Repository
export interface IRepository<Entity, Condition, UpdateDTO> extends IQueryRepository<Entity, Condition>, ICommandRepository<Entity, UpdateDTO> {}

// Query repository
export interface IQueryRepository<Entity, Condition> {
  get(id: string): Promise<Entity | null>;
  list(cond: Condition, paging: PagingDTO): Promise<Array<Entity>>;
  findByCond(cond: Condition): Promise<Entity | null>;
}

// Command repository
export interface ICommandRepository<Entity, UpdateDTO> {
  insert(data: Entity): Promise<boolean>;
  update(id: string, data: UpdateDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

// Command usecase
export interface ICommandHandler<Command, Result> {
  execute(command: Command): Promise<Result>;
}

//Query usecase
export interface IQueryHandler<Query, Result> {
  query(query: Query): Promise<Result>;
}

export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer"
}

export interface TokenPayload {
  sub: string,
  role: Role
}

export interface Requester extends TokenPayload {}

export interface ITokenProvider {
  generateToken(payload: TokenPayload): Promise<string>;
  verifyToken(token: string): Promise<TokenPayload | null>;
}

export interface TokenIntrospectResult {
  payload: TokenPayload,
  error?: Error,
  isOk: boolean
}

export interface ITokenIntrospect {
  introspect(token: string): Promise<TokenIntrospectResult>;
}