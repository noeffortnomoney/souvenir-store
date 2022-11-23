import React from 'react';
import './Topbar.scss';
import { Language, NotificationsNone, Settings } from '@mui/icons-material';

export const Topbar = () => {
	return (
		<div className='topbar'>
			<div className='wrapper'>
				<div className='left'>
					<span className='logo'>Admin</span>
				</div>
				<div className='right'>
					<div className='icons-container'>
						<NotificationsNone />
						<span className='icon-badge'>2</span>
					</div>
					<div className='icons-container'>
						<Language />
						<span className='icon-badge'>2</span>
					</div>
					<div className='icons-container'>
						<Settings />
					</div>
					<img
						src='https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg'
						alt=''
						className='avt'
					/>
				</div>
			</div>
		</div>
	);
};
