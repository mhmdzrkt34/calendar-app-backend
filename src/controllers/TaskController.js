import { CreateTaskService, UpdateTaskService, DeleteTaskService, GetTasksService } from "../services/TaskService.js";

export const CreateTask = async (req, res, next) => {
    try {
        const response = await CreateTaskService(req);
        res.locals.response = response;
        return next();
    } catch (err) {
        if (err.from === undefined && typeof err === "object") err.from = "TaskController -> CreateTask";
        return next(err);
    }
};

export const UpdateTask = async (req, res, next) => {
    try {
        const response = await UpdateTaskService(req);
        res.locals.response = response;
        return next();
    } catch (err) {
        if (err.from === undefined && typeof err === "object") err.from = "TaskController -> UpdateTask";
        return next(err);
    }
};

export const DeleteTask = async (req, res, next) => {
    try {
        const response = await DeleteTaskService(req);
        res.locals.response = response;
        return next();
    } catch (err) {
        if (err.from === undefined && typeof err === "object") err.from = "TaskController -> DeleteTask";
        return next(err);
    }
};

export const GetTasks = async (req, res, next) => {
    try {
        const response = await GetTasksService(req);
        res.locals.response = response;
        return next();
    } catch (err) {
        if (err.from === undefined && typeof err === "object") err.from = "TaskController -> GetTasks";
        return next(err);
    }
};
