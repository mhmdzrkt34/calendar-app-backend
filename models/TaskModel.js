import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import UserModel from "./UserModel.js";

const TaskModel = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },

    public_key: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
    },
    start_date: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
    },
    end_date: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
    },
    deleted: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "tasks_001",
    timestamps: false,
  },
);
export default TaskModel;
