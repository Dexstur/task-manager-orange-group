import express from "express";
import {
  create,
  readAll,
  readOne,
  update,
  remove,
  changeStatus,
} from "../controllers/task";

const router = express.Router();

router.post("/", create);
router.get("/", readAll);
router.get("/:id", readOne);
router.put("/:id", update);
router.delete("/:id", remove);
router.patch("/:id", changeStatus);

export default router;
