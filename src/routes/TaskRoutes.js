import express from "express";
import { CreateTask, UpdateTask, DeleteTask, GetTasks } from "../controllers/TaskController.js";
import { validateCreateTask, validateUpdateTask, validateDeleteTask, validateGetTasks, verifyTaskOwnership } from "../validations/TaskValidation.js";
import { authorize } from "../middlewares/Authorize.js";

const router = express.Router();

router.get("/list",authorize, validateGetTasks, authorize, GetTasks);
router.post("/",authorize, validateCreateTask, authorize, CreateTask);
router.patch("/:public_key",authorize, validateUpdateTask, authorize, verifyTaskOwnership, UpdateTask);
router.delete("/:public_key",authorize, validateDeleteTask, authorize, verifyTaskOwnership, DeleteTask);

export default router;
