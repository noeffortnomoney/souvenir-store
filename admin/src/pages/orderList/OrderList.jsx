import { DeleteOutline, Filter1Outlined, FilterAlt } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './OrderList.scss';

export const OrderList = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getAllOrders = async () => {
			try {
				const res = await axios.get('/order/');
				if (res && res.data) {
					setOrders(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getAllOrders();
	}, []);

	const handleDeleteOrder = (id) => {
		const deleteOrder = async (id) => {
			const res = await axios.delete(`/order/${id}`);
			if (res.status === 200) {
				toast.success('Xóa sản phẩm thành công!');
				const curOrders = orders.filter((p) => p._id !== id);
				setOrders(curOrders);
			} else {
				toast.error('Lỗi! Vui lòng thử lại');
			}
		};
		deleteOrder(id);
	};

	const columns = [
		{ field: '_id', headerName: 'Mã đơn', width: 120 },
		{
			field: 'createdAt',
			headerName: 'Ngày đặt hàng',

			width: 150,
			renderCell: (params) => {
				return moment(params.value).format('DD/MM/YYYY, h:mm:ss a');
			},
		},
		{
			field: 'province',
			headerName: 'Tỉnh/Thành phố',
			width: 150,
		},
		{
			field: 'district',
			headerName: 'Quận/Huyện',
			width: 150,
		},
		{
			field: 'ward',
			headerName: 'Phường/Xã',
			width: 150,
		},
		{
			field: 'status',
			headerName: 'Trạng thái',
			width: 100,
			renderCell: (params) => {
				return (
					<button className={'btn ' + params.value}>
						{params.value === 'pending'
							? 'Đang chờ'
							: params.value === 'delivering'
							? 'Đang giao'
							: params.value === 'approved'
							? 'Đã giao'
							: 'Đã hủy'}
					</button>
				);
			},
		},
		{
			field: 'action',
			headerName: 'Tùy chọn',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={'/order/' + params.row._id}>
							<button className='edit'>Chi tiết</button>
						</Link>
						<DeleteOutline
							className='delete'
							onClick={() => handleDeleteOrder(params.row._id)}
						/>
					</>
				);
			},
		},
	];
	return (
		<div className='order-list'>
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
			<div className='header'>
				<h1 className='title'>Đơn hàng</h1>
				<div className='filter'>
					<div className='label'>
						Lọc <FilterAlt className='icon' />
					</div>
				</div>
			</div>
			<DataGrid
				rows={orders}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={8}
				checkboxSelection
			/>
		</div>
	);
};
