import { AppError } from "../../../shared/app-error";

export const ErrorFoodNotFound = AppError.from(new Error("Food not found"), 404);
export const ErrorInvalidAddCartItem = AppError.from(
	new Error("Invalid add cart item"),
	400
);