import React, { useEffect, useState } from 'react';
import './Order.scss';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../../helpers/format';
import { paymentMethod, statusValue } from '../../helpers/constant';
import _ from 'lodash';
import { Dialog } from '@mui/material';

export const Order = () => {
	const id = useParams().id;

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [info, setInfo] = useState({});
	const [cartOrder, setCartOrder] = useState([]);
	const [sttOrder, setSttOrder] = useState('');

	useEffect(() => {
		const getOrder = async () => {
			const res = await axios.get(`/order/${id}`);

			if (res.status === 200) {
				const { cart, ...orderInfo } = res.data;
				setInfo(orderInfo);

				const cartOrderList = await Promise.all(
					cart.map(async (item) => {
						const resItem = await axios.get(
							`/product/${item.productId}`
						);
						const dataItem = resItem.data;

						return {
							id: item.productId,
							name: dataItem.name,
							price: dataItem.price,
							image: dataItem.image,
							quantity: item.quantity,
							variations: item.variations,
						};
					})
				);

				setCartOrder(cartOrderList);
			} else {
				toast.error('Lỗi!');
			}
		};

		getOrder();
	}, [id]);

	useEffect(() => {
		if (!_.isEmpty(info)) {
			setSttOrder(info.status);
		}
	}, [info]);

	const handleUpdateStatus = async () => {
		if (sttOrder === info.status) {
			toast.error('Trạng thái đơn hàng chưa được thay đổi!');
		} else {
			try {
				const res = await axios.put(`/order/${id}`, {
					status: sttOrder,
				});
				if (res.status === 200) {
					toast.success('Cập nhật trạng thái đơn hàng thành công!');
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				} else {
					toast.error('Lỗi! Vui lòng thử lại');
				}
			} catch (err) {
				toast.error('Lỗi! Vui lòng thử lại');

				console.log(err);
			}
		}
	};

	const columns = [
		{ field: 'id', headerName: 'Mã sản phẩm', width: 120 },
		{
			field: 'name',
			headerName: 'Tên sản phẩm',
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
		{ field: 'quantity', headerName: 'Số lượng', width: 120 },
		{
			field: 'variations',
			headerName: 'Tùy chọn',
			width: 120,
			renderCell: (params) => {
				if (params.value) {
					return Object.keys(params.value).map((item, index) => {
						return (
							<div className='variation' key={index}>
								<span className='label'>{item}:</span>
								<span className='value'>
									{params.value[item]}
								</span>
							</div>
						);
					});
				} else {
					return '(trống)';
				}
			},
		},
		{
			field: 'price',
			headerName: 'Giá',
			width: 120,
		},
		{
			field: 'total',
			headerName: 'Thành tiền',
			width: 120,
			renderCell: (params) => {
				return (
					<div className='total'>
						{formatCurrency(params.row.quantity * params.row.price)}
					</div>
				);
			},
		},
	];
	return (
		<div className='order'>
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
				<h1 className='title'>Chi tiết đơn hàng</h1>
			</div>
			<div className='top'>
				<div className='left'>
					<div className='title'>Thông tin đơn hàng</div>
					<table className='info'>
						<tbody>
							<tr>
								<td className='label'>Mã đơn hàng:</td>
								<td>{info?._id}</td>
							</tr>
							<tr>
								<td className='label'>Họ và tên:</td>
								<td>
									{info?.firstName + ' ' + info?.lastName}
								</td>
							</tr>
							<tr>
								<td className='label'>Email:</td>
								<td>{info?.email}</td>
							</tr>
							<tr>
								<td className='label'>Số điện thoại:</td>
								<td>{info?.telephone}</td>
							</tr>
							<tr>
								<td className='label'>Tỉnh / Thành phố:</td>
								<td>{info?.province}</td>
							</tr>
							<tr>
								<td className='label'>Quận / Huyện:</td>
								<td>{info?.district}</td>
							</tr>
							<tr>
								<td className='label'>Xã / Phường:</td>
								<td>{info?.ward}</td>
							</tr>
							<tr>
								<td className='label'>Số nhà, tên đường:</td>
								<td>{info?.address}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='right'>
					<div className='title'>Thông tin đơn hàng</div>
					<div className='total'>
						<span className='label'>Giá trị đơn hàng: </span>
						<span className='value'>
							{formatCurrency(info?.value)}
						</span>
					</div>
					<div className='payment'>
						<span className='label'>Phương thức thanh toán:</span>
						<span className='value'>
							{paymentMethod(info?.payment)}
						</span>
					</div>
					<div className='status'>
						<div className='status-title'>
							<span className='label'>Trạng thái đơn hàng: </span>
							<span className='value'>
								{statusValue(info?.status)}
							</span>
						</div>
						<ul className='list'>
							<li className='item'>
								<button
									className={`pending ${
										sttOrder === 'pending' ? '' : 'disabled'
									} `}
									onClick={() => setSttOrder('pending')}>
									Đang chờ
								</button>
							</li>
							<li className='item'>
								<button
									className={`delivering ${
										sttOrder === 'delivering'
											? ''
											: 'disabled'
									} `}
									onClick={() => setSttOrder('delivering')}>
									Đang giao
								</button>
							</li>
							<li className='item'>
								<button
									className={`approved ${
										sttOrder === 'approved'
											? ''
											: 'disabled'
									} `}
									onClick={() => setSttOrder('approved')}>
									Đã giao
								</button>
							</li>
							<li className='item'>
								<button
									className={`cancel ${
										sttOrder === 'cancel' ? '' : 'disabled'
									} `}
									onClick={() => setSttOrder('cancel')}>
									Đã hủy
								</button>
							</li>
						</ul>
						<div className='update-btn'>
							<button
								className='btn'
								onClick={() => handleUpdateStatus()}>
								Cập nhật
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='bottom'>
				<div className='title-container'>
					<h2>Chi tiết giỏ hàng</h2>
				</div>
				<div className='list'>
					<DataGrid
						rows={cartOrder}
						disableSelectionOnClick
						autoHeight
						columns={columns}
						pageSize={8}
						checkboxSelection
					/>
				</div>
			</div>
		</div>
	);
};
