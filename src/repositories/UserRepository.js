import UserModel from "../../models/UserModel.js";

export const createUser = async ({email, transaction})=>{
let user = await UserModel.create({email:email}, {transaction})
return user;
}