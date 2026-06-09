import sequelize from "../../config/database.js";
import UserModel from "../../models/UserModel.js";
import { createTask, updateTask, softDeleteTask, findTasks } from "../repositories/TaskRepository.js";

// MUI Scheduler sends ISO 8601 strings; store as Unix ms
const toUnix = (dateStr) => new Date(dateStr).getTime();

// Return ISO 8601 strings back to the frontend
const toMui = (unixMs) => new Date(Number(unixMs)).toISOString();

const formatTask = (task) => ({
    public_key: task.public_key,
    title: task.title,
    description: task.description,
    start_date: toMui(task.start_date),
    end_date: toMui(task.end_date),
    color: task.color,
    created_at: task.created_at,
    updated_at: task.updated_at,
});

const resolveUser = async (publicKey) => {
    const user = await UserModel.findOne({ where: { public_key: publicKey } });
    if (!user) throw "User not found";
    return user;
};

export const CreateTaskService = async (req) => {
    const { title, description, start_date, end_date, color } = req.body;
    const user = await resolveUser(req.context.user.userId);

    const transaction = await sequelize.transaction();
    const task = await createTask({
        title,
        description,
        start_date: toUnix(start_date),
        end_date: toUnix(end_date),
        user_id: user.id,
        color,
        transaction,
    });
    await transaction.commit();

    return { success: true, message: "Task created successfully", data: formatTask(task) };
};

export const UpdateTaskService = async (req) => {
    const { public_key } = req.params;
    const { title, description, start_date, end_date, color } = req.body;
    const user = req.context.resolvedUser ?? await resolveUser(req.context.user.userId);

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (start_date !== undefined) updates.start_date = toUnix(start_date);
    if (end_date !== undefined) updates.end_date = toUnix(end_date);
    if (color !== undefined) updates.color = color;

    const transaction = await sequelize.transaction();
    await updateTask({ public_key, user_id: user.id, updates, transaction });
    await transaction.commit();

    return { success: true, message: "Task updated successfully" };
};

export const DeleteTaskService = async (req) => {
    const { public_key } = req.params;
    const user = req.context.resolvedUser ?? await resolveUser(req.context.user.userId);

    const transaction = await sequelize.transaction();
    await softDeleteTask({ public_key, user_id: user.id, transaction });
    await transaction.commit();

    return { success: true, message: "Task deleted successfully" };
};

export const GetTasksService = async (req) => {
    const user = await resolveUser(req.context.user.userId);
    const tasks = await findTasks({ user_id: user.id });

    return {
        success: true,
        message: "Tasks fetched successfully",
        data: tasks.map(formatTask),
    };
};
