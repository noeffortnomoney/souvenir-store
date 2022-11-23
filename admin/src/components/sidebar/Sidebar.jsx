import {
	AttachMoney,
	ChatBubbleOutline,
	DynamicFeed,
	LineStyle,
	MailOutline,
	PermIdentity,
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
							to='/'
							className='list-item'
							activeclassname='active'>
							<LineStyle className='icon' />
							Home
						</NavLink>
						<li className='list-item'>
							<Timeline className='icon' />
							Analytics
						</li>
						<li className='list-item'>
							<TrendingUp className='icon' />
							Sales
						</li>
					</ul>
				</div>
				<div className='menu'>
					<h3 className='title'>Quick Menu</h3>
					<ul className='list'>
						<li className='list-item '>
							<PermIdentity className='icon' />
							Users
						</li>
						<NavLink
							to='/products'
							activeclassname='active'
							className='list-item'>
							<Storefront className='icon' />
							Products
						</NavLink>
						<NavLink
							to='/orders'
							activeclassname='active'
							className='list-item'>
							<AttachMoney className='icon' />
							Transactions
						</NavLink>
						<li className='list-item'>
							<TrendingUp className='icon' />
							Reports
						</li>
					</ul>
				</div>
				<div className='menu'>
					<h3 className='title'>Notifications</h3>
					<ul className='list'>
						<li className='list-item '>
							<MailOutline className='icon' />
							Mail
						</li>
						<li className='list-item'>
							<DynamicFeed className='icon' />
							Feedback
						</li>
						<li className='list-item'>
							<ChatBubbleOutline className='icon' />
							Messages
						</li>
					</ul>
				</div>
				<div className='menu'>
					<h3 className='title'>Staff</h3>
					<ul className='list'>
						<li className='list-item '>
							<WorkOutline className='icon' />
							Manage
						</li>
						<li className='list-item'>
							<Timeline className='icon' />
							Analytics
						</li>
						<li className='list-item'>
							<Report className='icon' />
							Reports
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
