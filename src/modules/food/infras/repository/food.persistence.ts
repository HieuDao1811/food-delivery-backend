import { DataTypes, Model, Sequelize } from "sequelize";

export class FoodPersistence extends Model {
  declare id: string
  declare isAvailable: boolean
}

export const modelName = "Food";

export function init(sequelize: Sequelize) {
  FoodPersistence.init(
    {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url"
    },
    isAvailable: {
      type:DataTypes.TINYINT,
      field: "is_available",
      allowNull: false,
      defaultValue: 1
    }
    },
    {
      sequelize,
      modelName: modelName,
      timestamps: true,
      tableName: "foods",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  )
}