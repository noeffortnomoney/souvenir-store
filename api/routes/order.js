import { Router } from 'express';
import {
	createOrder,
	getAllOrder,
	getOrderById,
	upadteOrder,
} from '../controllers/OrderController.js';

const router = Router();
// create a new order
router.post('/', createOrder);

// update a order
router.put('/:id', upadteOrder);

// get all order
router.get('/', getAllOrder);

// get order by id
router.get('/:id', getOrderById);

export default router;
