import { AppError } from "../../../shared/app-error";

export const ErrorFoodNotFound = AppError.from(new Error("Food not found"), 404);
export const ErrorInvalidAddCartItem = AppError.from(
	new Error("Invalid add cart item"),
	400
);

export const ErrorCartNotFound = AppError.from(new Error("Cart not found"), 404);