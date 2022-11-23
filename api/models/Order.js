import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		cart: [
			{
				type: {
					productId: {
						type: Schema.Types.ObjectId,
						ref: 'Product',
					},
					quantity: {
						type: Number,
					},
					variations: {
						type: Object,
						default: {},
					},
				},
			},
		],
		email: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		telephone: { type: String, require: true },
		address: { type: String, required: true },
		province: { type: String, required: true },
		district: { type: String, required: true },
		ward: { type: String, required: true },
		payment: { type: String, required: true },
		value: { type: Number, required: String },
		status: {
			type: String,
			default: 'pending',
			enum: ['pending', 'delivering', 'approved', 'cancel'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
