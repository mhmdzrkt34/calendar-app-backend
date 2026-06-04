import jwt from "jsonwebtoken";
export const generateJwtToken = (user) => {
    const token = jwt.sign({
        userId: user.public_key,
        email:user.email

    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRE_DATE
    }
);
    return token;
}