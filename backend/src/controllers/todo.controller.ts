import { Request, Response } from 'express';
import Todo from '../models/todos';


export const getAllTodos = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; 

    const todos = await Todo.find({ userId });


    return res.json({
      count: todos.length,
      todos,
    });
  } catch (error) {
    console.error("Get all todos error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTodoById = async (req: any, res: Response) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id; 

    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found or you are not authorized",
      });
    }

    return res.json(todo);

  } catch (error) {
    console.error("Get todo by ID error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;

    
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const userId = req.user.id;

    const todo = await Todo.create({
      title,
      description,
      userId,
    });

    return res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error("Create todo error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (req: any, res: Response) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;

    const { title, description } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId }, 
      updateData,
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found or you are not authorized",
      });
    }

    return res.json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });

  } catch (error) {
    console.error("Update todo error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const toggleTodoStatus = async (req: any, res: Response) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;

    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found or unauthorized",
      });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.json({
      message: "Todo status toggled successfully",
      todo,
    });

  } catch (error) {
    console.error("Toggle todo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTodo = async (req: any, res: Response) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;

    const deleted = await Todo.findOneAndDelete({ _id: todoId, userId });

    if (!deleted) {
      return res.status(404).json({
        message: "Todo not found or you are not authorized",
      });
    }

    return res.json({
      message: "Todo deleted successfully",
      deletedTodo: deleted,
    });

  } catch (error) {
    console.error("Delete todo error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
