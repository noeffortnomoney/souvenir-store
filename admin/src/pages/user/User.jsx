import {
	CalendarToday,
	Directions,
	LocationSearching,
	MailOutline,
	PermIdentity,
	PhoneAndroid,
	Publish,
} from '@mui/icons-material';
import React from 'react';
import './User.scss';

export const User = () => {
	return (
		<div className='user'>
			<div className='title-container'>
				<h1 className='title'>Edit User</h1>
				<button className='add-btn'>Create</button>
			</div>
			<div className='container'>
				<div className='show'>
					<div className='show-top'>
						<img
							src='https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg'
							alt=''
							className='img'
						/>
						<div className='title'>
							<span className='username'>Anna Beckker</span>
							<span className='user-title'>
								Software Engineer
							</span>
						</div>
					</div>
					<div className='show-bottom'>
						<span className='title'>Account Details</span>
						<div className='info'>
							<PermIdentity className='icon' />
							<span className='info-title'>annabeck9</span>
						</div>
						<div className='info'>
							<CalendarToday className='icon' />
							<span className='info-title'>10.12.1990</span>
						</div>
						<span className='title'>Contact Details</span>

						<div className='info'>
							<PhoneAndroid className='icon' />
							<span className='info-title'>+98492432</span>
						</div>
						<div className='info'>
							<MailOutline className='icon' />
							<span className='info-title'>
								annabekc@gmail.com
							</span>
						</div>
						<div className='info'>
							<LocationSearching className='icon' />
							<span className='info-title'>New York USA</span>
						</div>
					</div>
				</div>
				<div className='update'>
					<span className='title'>Edit</span>
					<form className='update-form'>
						<div className='left'>
							<div className='item'>
								<label>Username</label>
								<input
									type='text'
									name=''
									placeholder='annbeck99'
									className='input'
									id=''
								/>
							</div>
							<div className='item'>
								<label>Full Name</label>
								<input
									type='text'
									name=''
									placeholder='annbeck99'
									className='input'
									id=''
								/>
							</div>
							<div className='item'>
								<label>Email</label>
								<input
									type='text'
									name=''
									placeholder='annbeck99'
									className='input'
									id=''
								/>
							</div>
							<div className='item'>
								<label>Phone</label>
								<input
									type='text'
									name=''
									placeholder='annbeck99'
									className='input'
									id=''
								/>
							</div>
							<div className='item'>
								<label>Address</label>
								<input
									type='text'
									name=''
									placeholder='annbeck99'
									className='input'
									id=''
								/>
							</div>
						</div>
						<div className='right'>
							<div className='upload'>
								<img
									src='https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg'
									alt=''
									className='img'
								/>
								<label htmlFor='file'>
									<Publish className='icon' />
								</label>
								<input type='file' hidden name='' id='file' />
							</div>
							<button className='btn'>Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
