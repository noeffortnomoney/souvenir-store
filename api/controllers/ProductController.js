import Product from '../models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Order from '../models/Order.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
	const newProduct = new Product({
		name: req.body.name,
		desc: req.body.desc,
		price: req.body.price,
		inStock: JSON.parse(req.body.inStock),
	});
	if (req.file) {
		newProduct.image = '/product/' + req.file.filename;
	}
	if (req.body.variations) {
		newProduct.variations = JSON.parse(req.body.variations);
	}
	if (req.body.category) {
		newProduct.category = JSON.parse(req.body.category);
	}
	try {
		const savedProduct = await newProduct.save();
		console.log(req.body);
		return res.status(201).json({
			message: 'Create new product successfully!!!',
			savedProduct,
		});
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const updateProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (req.file) {
		const pathToFile = path.join(
			__dirname,
			'../public/images',
			product.image
		);
		fs.unlink(pathToFile, (err) => {
			if (err) {
				console.log(err);
			}
		});
		product.image = '/product/' + req.file.filename;

		try {
			await product.save();
		} catch (err) {
			return res.status(500).json(err);
		}
	}

	try {
		product.name = req.body.name;
		product.desc = req.body.desc;
		product.price = req.body.price;

		if (product.variations) {
			product.variations = JSON.parse(req.body.variations);
		}

		const updatedProduct = await product.save();

		return res.status(200).json(updatedProduct);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const deleteProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		try {
			await product.delete();
			const pathToFile = path.join(
				__dirname,
				'../public/images',
				product.image
			);
			fs.unlink(pathToFile, (err) => {
				if (err) {
					console.log(err);
				}
			});
			res.status(200).json('Delete product successfully!!');
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(404).json('Not found product!!!');
	}
};

export const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json('Product is not found');
	}
	return res.status(200).json(product);
};

export const getCountPage = async (req, res) => {
	const { PAGE_SIZE } = process.env;

	const totalPage = Math.ceil((await Product.count({})) / PAGE_SIZE);
	res.status(200).json({ totalPage });
};

export const getAllProduct = async (req, res) => {
	let { amount, page } = req.query;
	if (req.query.new) {
		if (amount) {
			amount = +amount;
			let products = await Product.find({})
				.sort({ createdAt: 'desc' })
				.limit(amount);
			res.status(200).json(products);
		}
	} else if (req.query.page) {
		page = +page;
		const { PAGE_SIZE } = process.env;
		const skip = (page - 1) * PAGE_SIZE;

		try {
			let products = await Product.find({})
				.skip(skip)
				.limit(PAGE_SIZE)
				.sort({ createdAt: 'desc' });
			return res.status(200).json(products);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		try {
			let products = await Product.find({});
			res.status(200).json(products);
		} catch (err) {
			res.status(500).json(err);
		}
	}
};
