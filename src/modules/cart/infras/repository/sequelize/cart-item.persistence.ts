import { DataTypes, Model, Sequelize } from "sequelize";

export class CartItemPersistence extends Model {}

export const modelName = "CartItem";

export function init(sequelize: Sequelize) {
  CartItemPersistence.init({
    cartId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      field: "cart_id"
    },
    foodId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      field: "food_id"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: modelName,
    tableName: "cart_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  })
}