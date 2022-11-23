import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProduct,
	getCountPage,
	getProduct,
	updateProduct,
} from '../controllers/ProductController.js';
import upload from '../middleware/upload.js';

const router = Router();

// create product
router.post('/', upload.single('file'), createProduct);

// update product
router.put('/:id', upload.single('file'), updateProduct);

// delete product
router.delete('/:id', deleteProduct);

// get count page
router.get('/pages', getCountPage);

// get a product
router.get('/:id', getProduct);

// get all product
router.get('/', getAllProduct);

export default router;
