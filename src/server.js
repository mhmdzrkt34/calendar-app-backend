
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
import sequelize from "../config/database.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.context = {};
    return next();
});
app.use("/api/auth",AuthRoutes);
app.use("/api/task",TaskRoutes);

app.use((err, req, res, next) => {
    if (typeof err === "string") {
        return res.status(400).json({
            message: err,
            success:false
        });
    }
    console.error(err);
    return res.status(500).json({
        message: err.message ||"Internal Server Error",
        success:false
    });
});
app.use((req, res, next) => {
    return res.status(200).json(res.locals.response);
});
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully");

        await sequelize.sync();
        console.log("Database synced");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to MySQL:", error.message);
    }
};
startServer();