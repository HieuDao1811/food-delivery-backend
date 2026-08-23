export const ErrorInvalidCategoryData = new Error("Invalid category data");
export const ErrorCategoryNotFound = new Error("Category not found");
export const ErrorCategoryNameDuplicated = new Error("Category name already exists");
export const ErrorCategoryParentNotFound = new Error("Category parent not found");
export const ErrorInvalidCategoryParent = new Error("Category parent relationship would create a cycle");
export const ErrorCategoryHasChildren = new Error("Cannot delete a category that has children");

export const ErrCategoryNameRequired = new Error("Category name is required");
export const ErrCategoryUpdateAtLeastOneField = new Error("At least one category field is required");
