import { DataTypes, Model, Sequelize } from "sequelize";

export class CartPersistence extends Model {}

export const modelName = "Cart";

export function init(sequelize: Sequelize) {
  CartPersistence.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_id",
      },
    },
    {
      sequelize,
      modelName: modelName,
      tableName: "carts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
}