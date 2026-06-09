import sequelize from "../../config/database.js";
import { createOtp, updateOtp } from "../repositories/OtpRepository.js";
import { createUser } from "../repositories/UserRepository.js";
import { generateJwtToken } from "./TokenService.js";

export const LoginService = async (req, res, next) => {
  const { email } = req.body;
  const transaction = await sequelize.transaction();
  let user = req.context?.user;
  console.log("User from context:", user);
  if (!user) {
    user = await createUser({ email, transaction });
  }
  await updateOtp({ id: req.context.otpRecord.id, is_used: 1, transaction });
  await transaction.commit();
  let token = generateJwtToken(user);
  let response = {
    success: true,
    message: "Login successful",
    data: {
      token,
    },
  };
  console.log("Generated token:", token);
  return response;
};
export const SendOtpService = async (req, res, next) => {
  const { email } = req.body;
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP:", otp);
  // Here you would typically save the OTP to the database and send it to the user's email
  const transaction = await sequelize.transaction();
  await createOtp({ email, otp_code: otp, transaction });
  await transaction.commit();
  let response = {
    success: true,
    message: "OTP sent successfully",
  };
  res.locals.response = response;
  console.log("OTP sent response:", response);
  return response;
};
