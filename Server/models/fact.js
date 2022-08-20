import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index.js";

class FactModel extends Model {}

FactModel.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    _id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    user: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.JSON
    },
    text: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    __v: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    source: {
      allowNull: true,
      type: DataTypes.STRING
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING
    },
    deleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    used: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "fact", // We need to choose the model name
  }
);

export default FactModel;
