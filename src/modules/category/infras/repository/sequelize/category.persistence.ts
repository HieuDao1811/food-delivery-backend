import { DataTypes, Model, Sequelize } from "sequelize";

export class CategoryPersistence extends Model {}

export const modelName = "Category";

export function init(sequelize: Sequelize) {
  CategoryPersistence.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parentId: {
        type: DataTypes.STRING,
        field: "parent_id",
        allowNull: true
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
      tableName: "categories",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  )
}