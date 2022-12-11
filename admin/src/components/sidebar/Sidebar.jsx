import {
	AttachMoney,
	ChatBubbleOutline,
	DynamicFeed,
	LineStyle,
	MailOutline,
	PermIdentity,
	Receipt,
	Report,
	Storefront,
	Timeline,
	TrendingUp,
	WorkOutline,
} from '@mui/icons-material';
import { Link } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='wrapper'>
				<div className='menu'>
					<h3 className='title'>Dashboard</h3>
					<ul className='list'>
						<NavLink
							to='/products'
							className='list-item'
							activeclassname='active'>
							<Storefront className='icon' />
							Sản phẩm
						</NavLink>
						<NavLink
							to='/orders'
							className='list-item'
							activeclassname='active'>
							<Receipt className='icon' />
							Đơn hàng
						</NavLink>
					</ul>
				</div>
			</div>
		</div>
	);
};
