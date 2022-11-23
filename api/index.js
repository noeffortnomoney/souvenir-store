import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import productRouter from './routes/product.js';
import orderRouter from './routes/order.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log('Connect db successfully');
	})
	.catch((err) => {
		console.log('Connect db failed', err);
	});

app.use(morgan('common'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.listen(process.env.PORT, () => {
	console.log('App is running ....');
});
