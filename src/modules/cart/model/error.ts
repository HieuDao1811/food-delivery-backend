import { AppError } from "../../../shared/app-error";

export const ErrorFoodNotFound = AppError.from(new Error("Food not found"), 404);
export const ErrorInvalidAddCartItem = AppError.from(new Error("Invalid add cart item"), 400);
export const ErrorCartItemQuantityExceeded = AppError.from(
	new Error("Cart item quantity cannot exceed 99"),
	400
);
export const ErrorCreateCartFailed = AppError.from(new Error("Cannot create cart"), 500);
export const ErrorCartNotFound = AppError.from(new Error("Cart not found"), 404);
export const ErrorInvalidUpdateCartItem = AppError.from(
	new Error("Invalid cart item quantity"),
	400
);
export const ErrorCartItemNotFound = AppError.from(
	new Error("Cart item not found"),
	404
);
