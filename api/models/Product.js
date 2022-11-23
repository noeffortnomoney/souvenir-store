import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, require: true, unique: true },
		price: { type: Number, require: true },
		desc: { type: String },
		category: {
			type: Array,
			default: [],
		},
		variations: { type: Object, default: {} },
		image: { type: String },
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Product', ProductSchema);
