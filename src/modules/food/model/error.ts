export const FoodErrorCode = {
  INVALID_DATA: 'FOOD_INVALID_DATA',
  NOT_FOUND: 'FOOD_NOT_FOUND',
  NAME_DUPLICATED: 'FOOD_NAME_DUPLICATED'
} as const;

export type FoodErrorCode = typeof FoodErrorCode[keyof typeof FoodErrorCode];

export class FoodError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: FoodErrorCode,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'FoodError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const foodErrors = {
  invalidData: (details?: unknown) =>
    new FoodError(400, FoodErrorCode.INVALID_DATA, 'Invalid food data', details),
  notFound: () =>
    new FoodError(404, FoodErrorCode.NOT_FOUND, 'Food not found'),
  nameDuplicated: () =>
    new FoodError(409, FoodErrorCode.NAME_DUPLICATED, 'Food name already exists')
};
