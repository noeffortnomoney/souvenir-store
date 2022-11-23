import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRows } from '../../dummyData';
import './UserList.scss';

export const UserList = () => {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'user',
			headerName: 'User',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='list-user'>
						<img className='img' src={params.row.avatar} alt='' />
						{params.row.username}
					</div>
				);
			},
		},
		{ field: 'email', headerName: 'Email', width: 200 },
		{
			field: 'status',
			headerName: 'Status',
			width: 90,
		},
		{
			field: 'transactions',
			headerName: 'Transactions Volume',
			width: 160,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 160,
			renderCell: (params) => {
				return (
					<>
						<Link to={'/user/' + params.row.id}>
							<button className='edit'>Edit</button>
						</Link>
						<DeleteOutline
							className='delete'
							onClick={() => handleDelete(params.row.id)}
						/>
					</>
				);
			},
		},
	];
	const [data, setData] = useState(userRows);

	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
	};

	return (
		<div className='user-list'>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={8}
				rowsPerPageOptions={[5]}
				checkboxSelection
				disableSelectionOnClick
			/>
		</div>
	);
};
