import TaskModel from "../../models/TaskModel.js";

export const createTask = async ({ title, description, start_date, end_date, user_id, color, transaction }) => {
    return await TaskModel.create(
        { title, description, start_date, end_date, user_id, color },
        { transaction }
    );
};

export const updateTask = async ({ public_key, user_id, updates, transaction }) => {
    return await TaskModel.update(
        { ...updates, updated_at: Date.now() },
        { where: { public_key, user_id, deleted: 0 }, transaction }
    );
};

export const softDeleteTask = async ({ public_key, user_id, transaction }) => {
    return await TaskModel.update(
        { deleted: 1, updated_at: Date.now() },
        { where: { public_key, user_id }, transaction }
    );
};

export const findTasks = async ({ user_id }) => {
    return await TaskModel.findAll({ where: { user_id, deleted: 0 } });
};

export const findTaskByOwner = async ({ public_key, user_id }) => {
    return await TaskModel.findOne({ where: { public_key, user_id, deleted: 0 } });
};
