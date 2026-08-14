import { DataTypes, Model, Sequelize } from "sequelize";

export class FoodPersistence extends Model {
  declare id: string
  declare isAvailable: number
  declare createdAt: Date
  declare updatedAt: Date
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
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
      },

      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at"
      }
    },
    {
      sequelize,
      modelName: modelName,
      timestamps: true,
      tableName: "foods",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  )
}
