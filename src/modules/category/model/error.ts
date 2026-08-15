export const CategoryErrorCode = {
  INVALID_DATA: "CATEGORY_INVALID_DATA",
  NOT_FOUND: "CATEGORY_NOT_FOUND",
  NAME_DUPLICATED: "CATEGORY_NAME_DUPLICATED",
  PARENT_NOT_FOUND: "CATEGORY_PARENT_NOT_FOUND",
  INVALID_PARENT: "CATEGORY_INVALID_PARENT",
  HAS_CHILDREN: "CATEGORY_HAS_CHILDREN"
} as const;

export type CategoryErrorCode = typeof CategoryErrorCode[keyof typeof CategoryErrorCode];

export class CategoryError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: CategoryErrorCode,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "CategoryError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const categoryErrors = {
  invalidData: (details?: unknown) =>
    new CategoryError(400, CategoryErrorCode.INVALID_DATA, "Invalid category data", details),
  notFound: () =>
    new CategoryError(404, CategoryErrorCode.NOT_FOUND, "Category not found"),
  nameDuplicated: () =>
    new CategoryError(409, CategoryErrorCode.NAME_DUPLICATED, "Category name already exists"),
  parentNotFound: () =>
    new CategoryError(400, CategoryErrorCode.PARENT_NOT_FOUND, "Category parent not found"),
  invalidParent: () =>
    new CategoryError(400, CategoryErrorCode.INVALID_PARENT, "Category parent relationship would create a cycle"),
  hasChildren: () =>
    new CategoryError(409, CategoryErrorCode.HAS_CHILDREN, "Cannot delete a category that has children")
};
