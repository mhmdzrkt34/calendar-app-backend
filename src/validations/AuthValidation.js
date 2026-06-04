import { checkSchema, validationResult } from "express-validator";
import UserModel from "../../models/UserModel.js";
import OtpModel from "../../models/OtpModel.js";
import { Op } from "sequelize";

export const validateLogin = async (req, res, next) => {
  await checkSchema({
    email: {
      isEmail: {
        errorMessage: "Invalid email format",
      },
    },
    otp: {
      isLength: {
        options: { min: 6, max: 6 },
        errorMessage: "OTP must be 6 digits",
      },
    },
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
      success: false,
    });
  }
  return next();
};
export const verifyLogin = async (req, res, next) => {
  const { email, otp } = req.body;
  let user = await UserModel.findOne({ where: { email } });
  const otpRecord = await OtpModel.findOne({
    where: {
      email,
      otp_code: otp,
      expires_at: { [Op.gt]: Date.now() },
      is_used: 0,
    },
  });
  if (!otpRecord) {
    return next("Invalid or expired OTP");
  }
  req.context.user = user ? user : null;
  req.context.otpRecord = otpRecord;
  return next();
};
export const validateOtp = async (req, res, next) => {
  await checkSchema({
    email: {
      isEmail: {
        errorMessage: "Invalid email format",
      },
    },
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
      success: false,
    });
  }
  return next();
};