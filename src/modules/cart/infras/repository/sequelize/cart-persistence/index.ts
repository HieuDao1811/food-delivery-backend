import { Model, ModelStatic, Sequelize } from "sequelize";
import { ICartRepository } from "../../../../interface";
import { Cart } from "../../../../model/cart";
import { modelName } from "./cart.persistence";

export class CartRepository implements ICartRepository {
	constructor(
		private readonly sequelize: Sequelize,
		private readonly modelName: string
	) {}

	private get model(): ModelStatic<Model> {
		const model = this.sequelize.models[this.modelName];

		if (!model) {
			throw new Error(
				`Sequelize model "${this.modelName}" has not been initialized`
			);
		}

		return model;
	}

	async findByUserId(userId: string): Promise<Cart | null> {
		const cart = await this.model.findOne({ where: { userId } });

		return cart ? cart.get({ plain: true }) as Cart : null;
	}

	async insert(cart: Cart): Promise<boolean> {
		await this.model.create(cart);
		return true;
	}
}