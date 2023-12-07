import { prisma } from "../app";
import { Request, Response } from "express";
import axios from "axios";

const mocker = "https://jsonplaceholder.typicode.com/todos";

export const getMockTask = async (req: Request, res: Response) => {
  try {
    const { id = 1 } = req.params;

    if (Number(id) > 200 || Number(id) < 1) {
      return res.status(400).json({
        message: "Invalid ID. Valid IDs(1-200)",
        data: {},
      });
    }

    axios
      .get(`${mocker}/${id}`)
      .then((response) => {
        return res.json({
          message: "Data retrieved",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(501).json({
          message: "Internal Server Error",
          error: "Fetch failed",
        });
      });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
