import { Publish } from '@mui/icons-material';
import { InputLabel, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Chart } from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { formatCurrency } from '../../helpers/format';
import './Product.scss';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

export const Product = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const id = useParams().id;
	const [product, setProduct] = useState(null);

	const [inStock, setInStock] = useState(null);

	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [price, setPrice] = useState('');
	const [variations, setVariations] = useState([]);

	const [file, setFile] = useState({
		preview: '',
		data: '',
	});

	useEffect(() => {
		const getProduct = async () => {
			const res = await axios.get(`/product/${id}`);
			if (res && res.status === 200) {
				setProduct(res.data);
				setInStock(res.data.inStock);
				setName(res.data.name);
				setDesc(res.data.desc);
				setPrice(res.data.price);
				if (res.data.variations && !_.isEmpty(res.data.variations)) {
					const variList = Object.keys(res.data.variations).map(
						(v) => ({
							key: v,
							value: res.data.variations[v].toString(),
						})
					);

					setVariations(variList);
				}
			} else {
				console.log('error');
				toast.error('Lỗi!');
			}
		};
		getProduct();
	}, [id]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('desc', desc);
		formData.append('price', price);
		formData.append('inStock', inStock);

		let variationsUpdate = {};
		if (variations.length > 0) {
			variationsUpdate = variations.reduce(
				(obj, v) => ({
					...obj,
					[v.key]: v.value.split(','),
				}),
				{}
			);
		}

		if (!_.isEmpty(variationsUpdate)) {
			formData.append('variations', JSON.stringify(variationsUpdate));
		}

		if (file.data) {
			formData.append('file', file.data);
		}

		try {
			const res = await axios.put(`/product/${id}`, formData);
			if (res.status === 200) {
				toast.success('Cập nhật sản phẩm thành công');
				window.location.href = `/product/${id}`;
			} else {
				toast.error('Lỗi! Vui lòng thủ lại!');
			}
		} catch (err) {
			toast.error('Lỗi! Vui lòng thủ lại!');
		}
	};

	return (
		<div className='product'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<div className='title-container'>
				<h1 className='title'>Product</h1>
				<Link to='/newproduct'>
					<button className='add-btn'>Create</button>
				</Link>
			</div>
			<div className='top'>
				<div className='left'>
					<Chart
						data={productData}
						title='Sales Performance'
						dataKey='Sales'
					/>
				</div>
				<div className='right'>
					<div className='info-top'>
						<img src={PF + product?.image} alt='' className='img' />
						<span className='name'>{product?.name}</span>
					</div>
					<div className='info-bottom'>
						<div className='item'>
							<span className='key'>id: </span>
							<span className='value'>{product?._id}</span>
						</div>
						<div className='item'>
							<span className='key'>Đã bán: </span>
							<span className='value'>?</span>
						</div>
						<div className='item'>
							<span className='key'>Giá: </span>
							<span className='value'>
								{formatCurrency(product?.price)}
							</span>
						</div>
						<div className='item'>
							<span className='key'>Kho: </span>
							<span className='value'>
								{product?.inStock ? 'Còn hàng' : 'Hết hàng'}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='bottom'>
				<form className='form' onSubmit={(e) => handleUpdate(e)}>
					<div className='left'>
						<div className='item'>
							<InputLabel>Tên sản phẩm</InputLabel>
							<TextField
								value={name}
								size='small'
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className='item'>
							<InputLabel>Mô tả</InputLabel>
							<TextField
								value={desc}
								fullWidth
								multiline
								rows={4}
								onChange={(e) => setDesc(e.target.value)}
							/>
						</div>

						<div className='item'>
							<InputLabel>Giá</InputLabel>
							<TextField
								inputProps={{
									inputMode: 'numeric',
									pattern: '[0-9]*',
								}}
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								size='small'
							/>
						</div>

						<div className='item' style={{ width: '150px' }}>
							<InputLabel>Kho hàng</InputLabel>
							<TextField
								select
								fullWidth
								value={inStock}
								onChange={(e) => setInStock(e.target.value)}
								size='small'>
								<MenuItem value={true}>Còn Hàng</MenuItem>
								<MenuItem value={false}>Hết Hàng</MenuItem>
							</TextField>
						</div>

						<div className='item'>
							<InputLabel style={{ marginBottom: '10px' }}>
								Tùy chọn
							</InputLabel>
							{!_.isEmpty(variations) &&
								variations.map((item, index) => (
									<div className='item' key={index}>
										<TextField
											label={item.key}
											size='small'
											defaultValue={item.value}
											onChange={(e) => {
												variations[index].value =
													e.target.value;
											}}
										/>
									</div>
								))}
						</div>
					</div>
					<div className='right'>
						<div className='upload'>
							<img
								src={file.preview || PF + product?.image}
								alt=''
								className='img'
							/>
							<label htmlFor='file'>
								<Publish />
							</label>
							<input
								type='file'
								id='file'
								style={{ display: 'none' }}
								accept='.jpg,.png,.jpeg'
								onChange={(e) => {
									setFile({
										preview: URL.createObjectURL(
											e.target.files[0]
										),
										data: e.target.files[0],
									});
								}}
							/>
						</div>
						<button className='btn' type='submit'>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
