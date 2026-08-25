import { DataTypes, Model, Sequelize } from "sequelize";

export class UserPersistence extends Model {
}

export const modelName = "User";

export function init(sequelize: Sequelize) {
  UserPersistence.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "unknown"),
        allowNull: false,
        defaultValue: "unknown"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("admin", "employee", "customer"),
        allowNull: false,
        defaultValue: "customer"
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active"
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
      tableName: "users",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  )
}
