import OtpModel from "../../models/OtpModel.js";

export const createOtp = async ({email, otp_code, transaction}) => {
    let otpInstance = await OtpModel.create({
        email,
        otp_code,}, {transaction});
    return otpInstance;
}
export const updateOtp = async ({id, is_used, transaction}) => {
    let otpInstance = await OtpModel.update({is_used}, {where:{id}, transaction});
    return otpInstance;
}