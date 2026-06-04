import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import TaskModel from "./TaskModel.js";
import OtpModel from "./OtpModel.js";

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    public_key: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
    },
  },
  {
    tableName: "users_001",
    timestamps: false,
  },
);

export default UserModel;
