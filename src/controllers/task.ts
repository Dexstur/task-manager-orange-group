import { Request, Response } from "express";
import { prisma } from "../app";
import { taskCreation } from "../auth/validation";

export const create = async (req: Request, res: Response) => {
  try {
    const { error } = taskCreation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Invalid data",
        error: error.message,
      });
    }
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      message: "Task created",
      data: task,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const readAll = async (req: Request, res: Response) => {
  try {
    let tasks;

    const { status } = req.query;

    if (!status) {
      tasks = await prisma.task.findMany();
    } else {
      const stringStatus = status?.toString().toUpperCase();
      if (stringStatus !== "PENDING" && stringStatus !== "COMPLETED") {
        return res.status(400).json({
          message: "Invalid status. Valid status(PENDING, COMPLETED)",
          error: "Bad Request",
        });
      }

      tasks = await prisma.task.findMany({
        where: {
          status: stringStatus,
        },
      });
    }

    return res.json({
      message: "Tasks retrieved",
      data: tasks,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Not Found",
      });
    }

    return res.json({
      message: "Task retrieved",
      data: task,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
      return res.status(400).json({
        message: "Nothing to update",
        error: "Bad Request",
      });
    }
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Not Found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: title || task.title,
        description: description || task.description,
      },
    });

    return res.json({
      message: "Task updated",
      data: updatedTask,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Not Found",
      });
    }

    const newStatus = task.status === "PENDING" ? "COMPLETED" : "PENDING";
    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
      },
    });

    return res.json({
      message: `Task ${newStatus.toLowerCase()}`,
      data: updatedTask,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Not Found",
      });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Task deleted",
      data: null,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
