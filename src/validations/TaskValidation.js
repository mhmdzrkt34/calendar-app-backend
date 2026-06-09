import { checkSchema, validationResult } from "express-validator";
import UserModel from "../../models/UserModel.js";
import { findTaskByOwner } from "../repositories/TaskRepository.js";

const respond = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array(), success: false });
    }
    return next();
};

export const validateCreateTask = async (req, res, next) => {
    await checkSchema({
        title: {
            notEmpty: { errorMessage: "Title is required" },
        },
        start_date: {
            notEmpty: { errorMessage: "start_date is required" },
            custom: {
                options: (val) => !isNaN(new Date(val).getTime()),
                errorMessage: "start_date must be a valid date string",
            },
        },
        end_date: {
            notEmpty: { errorMessage: "end_date is required" },
            custom: {
                options: (val) => !isNaN(new Date(val).getTime()),
                errorMessage: "end_date must be a valid date string",
            },
        },
    }).run(req);
    return respond(req, res, next);
};

export const validateUpdateTask = async (req, res, next) => {
    await checkSchema({
        public_key: {
            in: ["params"],
            notEmpty: { errorMessage: "Task public_key is required" },
        },
        start_date: {
            in: ["body"],
            optional: true,
            custom: {
                options: (val) => !isNaN(new Date(val).getTime()),
                errorMessage: "start_date must be a valid date string",
            },
        },
        end_date: {
            in: ["body"],
            optional: true,
            custom: {
                options: (val) => !isNaN(new Date(val).getTime()),
                errorMessage: "end_date must be a valid date string",
            },
        },
    }).run(req);
    return respond(req, res, next);
};

export const validateDeleteTask = async (req, res, next) => {
    await checkSchema({
        public_key: {
            in: ["params"],
            notEmpty: { errorMessage: "Task public_key is required" },
        },
    }).run(req);
    return respond(req, res, next);
};

export const validateGetTasks = async (req, res, next) => {
    return next();
};

export const verifyTaskOwnership = async (req, res, next) => {
    const { public_key } = req.params;
    const user = await UserModel.findOne({ where: { public_key: req.context.user.userId } });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const task = await findTaskByOwner({ public_key, user_id: user.id });
    if (!task) {
        return res.status(404).json({ message: "Task not found", success: false });
    }
    req.context.task = task;
    req.context.resolvedUser = user;
    return next();
};
