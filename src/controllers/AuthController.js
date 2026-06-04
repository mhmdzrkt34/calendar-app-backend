import { LoginService, SendOtpService } from "../services/authService.js";

export const Login = async (req, res, next) => {
    try {
        let response = await LoginService(req, res, next);
        console.log("Login response:", response);
        res.locals.response = response;
        return next();

    } catch (err) {
        err.from = "AuthController -> login";
        throw err;
    }
}
export const SendOtp = async (req, res, next) => {
    try{
        let response = await SendOtpService(req, res, next);
        res.locals.response = response;
        return next();
        

    }catch(err){
        err.from = "AuthController -> sendOtp";
        throw err;
    }
}