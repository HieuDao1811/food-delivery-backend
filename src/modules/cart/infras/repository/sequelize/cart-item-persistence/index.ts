import { Model, ModelStatic, Sequelize, Transaction } from "sequelize";
import { ICartItemRepository } from "../../../../interface";
import { CartItemCondDTO } from "../../../../model/dto";
import { CartItem } from "../../../../model/cart-item";

export class CartItemRepository implements ICartItemRepository {
  constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}

  private get model(): ModelStatic<Model> {
    const model = this.sequelize.models[this.modelName];

    if (!model) {
      throw new Error(
        `Sequelize model "${this.modelName}" has not been initialized`
      );
    }

    return model;
  }

  async removeItemFromCart(cartId: string, foodId: string): Promise<boolean> {
    const deleted = await this.model.destroy({where: { cartId, foodId }});
    return deleted > 0;
  }

  async insert(item: CartItem, transaction?: Transaction): Promise<boolean> {
    await this.model.create(item, {
      ...(transaction ? { transaction } : {})
    });
    return true;
  }

  async updateQuantity(cartId: string, foodId: string, quantity: number, transaction?: Transaction): Promise<boolean> {
    const [affectedRows] = await this.model.update({ quantity }, {
      where: {
        cartId, 
        foodId
      },
      ...(transaction ? { transaction } : {})
    });

    return affectedRows > 0;
  }

  async findByCond(cond: CartItemCondDTO, transaction?: Transaction): Promise<CartItem | null> {
    const item = await this.model.findOne({
      where: cond,
      ...(transaction ? { transaction } : {})
    });
    return item ? item.get({ plain: true }) as CartItem : null;
  }

  async listByCartId(cartId: string): Promise<CartItem[]> {
    const items = await this.model.findAll({ where: { cartId }});

    return items.map((item) => item.get({ plain: true }) as CartItem);
  }
  
}