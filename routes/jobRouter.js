import express from "express";
import {
  getAJob,
  getAlljobs,
  deleteJob,
  updateJob,
  createJob,
  showStats,
} from "../contollers/jobController.js";
import {
  validateJobInput,
  validateParams,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(getAlljobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
  .route("/:id")
  .patch(checkForTestUser, validateParams, validateJobInput, updateJob)
  .get(validateParams, getAJob)
  .delete(checkForTestUser, validateParams, deleteJob);

export default router;
