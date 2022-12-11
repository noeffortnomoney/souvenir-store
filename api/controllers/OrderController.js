import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
	const order = new Order(req.body);
	try {
		const savedOrder = await order.save();
		return res.status(200).json({
			message: 'Create order successfully',
			order: savedOrder,
		});
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const upadteOrder = async (req, res) => {
	const id = req.params.id;

	try {
		const order = await Order.findById(id);
		if (order) {
			const status = req.body.status;
			if (status) {
				order.status = status;

				const updatedOrder = await order.save();
				res.status(200).json(updatedOrder);
			}
		} else {
			res.status(404).json('Not Found');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getAllOrder = async (req, res) => {
	try {
		const orders = await Order.find({}).sort({ createdAt: 1 });
		return res.status(200).json(orders);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getOrderById = async (req, res) => {
	const id = req.params.id;

	try {
		const order = await Order.findById(id);
		if (order) {
			return res.status(200).json(order);
		} else {
			return res.status(404).json('Not found');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const deleteOrder = async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return res.status(404).json('Order not found');
	}

	try {
		await order.delete();
		res.status(200).json('Delete order successfully!!');
	} catch (err) {
		res.status(500).json(err);
	}
};
