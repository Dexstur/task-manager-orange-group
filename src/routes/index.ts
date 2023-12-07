import express from "express";
const router = express.Router();

const mocker = "https://jsonplaceholder.typicode.com/todos/";
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "welcome to the api", data: {} });
});

export default router;
