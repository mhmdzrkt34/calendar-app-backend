import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OtpModel = sequelize.define(
  "Otp",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },

    public_key: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },

    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
    },

    expires_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now() + 5 * 60 * 1000,
    },
    is_used: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    }
  },
  {
    tableName: "otps_001",
    timestamps: false,
  },
);
export default OtpModel;
