import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productRows } from '../../dummyData';
import './ProductList.scss';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment/moment';
import { formatCurrency } from '../../helpers/format';

export const ProductList = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getAllProducts = async () => {
			try {
				const res = await axios.get('/product/');
				if (res && res.data) {
					setProducts(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getAllProducts();
	}, []);

	const handleDelete = (id) => {
		const deleteProduct = async (id) => {
			const res = await axios.delete(`/product/${id}`);
			if (res.status === 200) {
				toast.success('Xóa sản phẩm thành công!');
				const curProducts = products.filter((p) => p._id !== id);
				setProducts(curProducts);
			} else {
				toast.error('Lỗi! Vui lòng thử lại');
			}
		};
		deleteProduct(id);
	};
	const columns = [
		{ field: '_id', headerName: 'ID', width: 120 },
		{
			field: 'product',
			headerName: 'Sản phẩm',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='list-item'>
						<img
							className='img'
							src={PF + params.row.image}
							alt=''
						/>
						{params.row.name}
					</div>
				);
			},
		},
		{
			field: 'inStock',
			headerName: 'Kho',
			width: 100,
			renderCell: (params) => {
				return params ? 'Còn hàng' : 'Hết hàng';
			},
		},
		{
			field: 'price',
			headerName: 'Giá',
			width: 160,
			renderCell: (params) => {
				return formatCurrency(params.value);
			},
		},
		{
			field: 'createdAt',
			headerName: 'Ngày tạo',
			width: 200,
			renderCell: (params) => {
				return moment(params.value).format('DD/MM/YYYY, h:mm:ss a');
			},
		},
		{
			field: 'action',
			headerName: 'Tùy chọn',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={'/product/' + params.row._id}>
							<button className='edit'>Sửa</button>
						</Link>
						<DeleteOutline
							className='delete'
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];
	return (
		<div className='product-list'>
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
			<div className='create'>
				<Link to='/newproduct' className='btn'>
					Thêm mới
				</Link>
			</div>
			<DataGrid
				rows={products}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={8}
				checkboxSelection
			/>
		</div>
	);
};
