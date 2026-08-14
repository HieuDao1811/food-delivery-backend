import { PagingDTO } from "../model/paging";


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