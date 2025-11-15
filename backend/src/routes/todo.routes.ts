import { Router } from 'express';
import {authMid} from '../middleware/auth.middleware';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus
} from '../controllers/todo.controller';

const router = Router();

router.get('/',authMid, getAllTodos);
router.get('/:id',authMid, getTodoById);
router.post('/',authMid, createTodo);
router.put('/:id',authMid, updateTodo);
router.patch('/:id/toggle',authMid, toggleTodoStatus);
router.delete('/:id',authMid, deleteTodo);

export default router;