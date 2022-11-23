import { Add } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './NewProduct.scss';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { MenuItem, TextField } from '@mui/material';

export const NewProduct = () => {
	const name = useRef('');
	const desc = useRef('');
	const price = useRef('');
	const category = useRef('');
	const [file, setFile] = useState({
		preview: '',
		data: '',
	});
	const [inStock, setInStock] = useState(true);

	const [variationsList, setVariationsList] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!name.current.value ||
			!file.preview ||
			!desc.current.value ||
			!price.current.value
		) {
			toast.error('Vui lòng điền đầy đủ thông tin sản phẩm');
		} else {
			let variations = {};
			if (variationsList.length > 0) {
				variations = variationsList.reduce(
					(obj, v) => ({
						...obj,
						[v.key]: v.value.split(','),
					}),
					{}
				);
			}
			let formData = new FormData();
			formData.append('file', file.data);
			formData.append('name', name.current.value);
			formData.append('desc', desc.current.value);
			formData.append('price', price.current.value);
			formData.append('inStock', inStock);

			if (!_.isEmpty(variations)) {
				formData.append('variations', JSON.stringify(variations));
			}

			if (category.current.value) {
				const categoryProduct = category.current.value
					.split(',')
					.map((e) => e.trim());
				formData.append('category', JSON.stringify(categoryProduct));
			}

			console.log(formData.get('category'));

			try {
				const res = await axios.post('/product/', formData);
				if (res.status === 201) {
					toast.success(
						'Thêm sản phẩm thành công. Trang sẽ được chuyển trong 5s ...'
					);
					setTimeout(() => {
						window.location.href = '/products';
					}, 5000);
				} else {
					toast.error('Lỗi! Vui lòng thủ lại!');
				}
			} catch (err) {
				toast.error('Lỗi! Vui lòng thủ lại!');
			}
		}
	};

	const handleChangeFile = (e) => {
		const img = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		};

		setFile(img);
	};

	return (
		<div className='new-product'>
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
			<h1 className='title'>Thêm sản phẩm mới</h1>
			<form className='form' onSubmit={(e) => handleSubmit(e)}>
				<div className='item'>
					<label>
						Hình ảnh <span className='required'>*</span>
					</label>
					<input
						type='file'
						id='file'
						onChange={(e) => handleChangeFile(e)}
						accept='.jpg,.png,.jpeg'
					/>
					{file.preview && (
						<div className='preview-img'>
							<img src={file.preview} alt='' className='img' />
						</div>
					)}
				</div>
				<div className='item'>
					<TextField
						label='Tên sản phẩm *'
						inputRef={name}
						size='small'
					/>
				</div>
				<div className='item'>
					<TextField
						multiline
						label='Mô tả *'
						inputRef={desc}
						fullWidth
						rows={4}
					/>
				</div>
				<div className='item'>
					<TextField
						label='Phân loại'
						inputRef={category}
						size='small'
					/>
				</div>
				<div className='item'>
					<TextField
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						label='Giá*'
						inputRef={price}
						size='small'
					/>
				</div>
				<div className='item'>
					<TextField
						select
						label='Kho'
						size='small'
						onChange={(e) => setInStock(e.target.value)}>
						<MenuItem key={true} value={true}>
							Còn Hàng
						</MenuItem>
						<MenuItem key={false} value={false}>
							Hết Hàng
						</MenuItem>
					</TextField>
				</div>
				<div className='item variations'>
					<label>Tùy chọn</label>
					<div className='variations-list'>
						{variationsList &&
							variationsList.length > 0 &&
							variationsList.map((v, index) => (
								<div className='variation-item' key={index}>
									<label>Tùy chọn {index + 1}</label>
									<input
										type='text'
										name='variation-key'
										className='input'
										placeholder='size ...'
										onChange={(e) =>
											(variationsList[index].key =
												e.target.value)
										}
									/>
									<label>Giá trị {index + 1}</label>
									<input
										type='text'
										name='variation-value'
										className='input'
										placeholder='11,12,13...'
										onChange={(e) =>
											(variationsList[index].value =
												e.target.value)
										}
									/>
								</div>
							))}
					</div>
					<Add
						className='icon'
						onClick={() =>
							setVariationsList([
								...variationsList,
								{
									key: '',
									value: '',
								},
							])
						}
					/>
				</div>
				<button className='btn' type='submit'>
					Thêm
				</button>
			</form>
		</div>
	);
};
