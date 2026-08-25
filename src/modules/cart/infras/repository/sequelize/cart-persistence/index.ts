import { Model, ModelStatic, Sequelize, Transaction } from "sequelize";
import { v7 } from "uuid";
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

	async findOrCreateByUserId(userId: string, transaction: Transaction): Promise<Cart> {
		const [cart] = await this.model.findOrCreate({
			where: { userId },
			defaults: { id: v7(), userId },
			transaction
		});

		return cart.get({ plain: true }) as Cart;
	}

	async insert(cart: Cart, transaction?: Transaction): Promise<boolean> {
		await this.model.create(cart, {
			...(transaction ? { transaction } : {})
		});
		return true;
	}
}