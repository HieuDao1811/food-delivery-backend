import { IQueryHandler } from "../../../shared/interface";
import { GetMyCartQuery, ICartItemQueryRepository, ICartRepository, IFoodRepository } from "../interface";
import { CartDetail } from "../model/cart";

export class GetMyCartQueryHandler implements IQueryHandler<GetMyCartQuery, CartDetail | null> {
  constructor(
    private readonly cartRepository: ICartRepository,
    private readonly cartItemRepository: ICartItemQueryRepository,
    private readonly foodRepository: IFoodRepository
  ) {}

  async query(query: GetMyCartQuery): Promise<CartDetail | null> {
    const cart = await this.cartRepository.findByUserId(query.userId);
    if (!cart) {
      return null;
    }

    const items = await this.cartItemRepository.listByCartId(cart.id);

    const foods = await this.foodRepository.findByIds(
      items.map((item) => item.foodId)
    );

    const foodsById = new Map(
      foods.map((food) => [food.id, food])
    );

    return {
      ...cart,
      items: items.map((item) => ({
        ...item,
        food: foodsById.get(item.foodId) ?? null
      }))
    };
  }
}