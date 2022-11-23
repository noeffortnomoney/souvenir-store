import React from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

export const Header = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const cart = JSON.parse(localStorage.getItem('cart'));

	return (
		<div className='header-container'>
			<div className='topbar'>
				<div className='left'>
					<div className='contact'>
						<FontAwesomeIcon
							icon={regular('envelope')}
							className='icon'
						/>

						<span>Email: support@demo.com</span>
					</div>
					<div className='contact'>
						<FontAwesomeIcon
							icon={solid('phone')}
							className='icon'
						/>
						<span>Hotline: +123 456 789</span>
					</div>
				</div>
				<div className='right'>
					<div className='list-icon'>
						<a className='icon-item' href='www.facebook.com'>
							<FontAwesomeIcon
								className='icon'
								icon={brands('facebook-f')}
							/>
						</a>
						<a className='icon-item' href='#'>
							<FontAwesomeIcon
								className='icon'
								icon={brands('twitter')}
							/>
						</a>
						<a className='icon-item' href='#'>
							<FontAwesomeIcon
								className='icon'
								icon={brands('instagram')}
							/>
						</a>
						<a className='icon-item' href='#'>
							<FontAwesomeIcon
								className='icon'
								icon={brands('github')}
							/>
						</a>
						<a className='icon-item'>
							<FontAwesomeIcon
								className='icon'
								icon={solid('magnifying-glass')}
							/>
						</a>
						<Link to='/cart' className='cart'>
							<FontAwesomeIcon
								className='icon'
								icon={solid('cart-shopping')}
							/>
							<div className='badge'>
								{cart.length < 10 ? cart.length : '9+'}
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className='logo'>
				<a href='#' className='logo-container'>
					<img src={PF + 'logo.png'} alt='' />
				</a>
			</div>
			<div className='navbar'>
				<div className='nav-list'>
					<Link to='/' className='nav-item'>
						Home
					</Link>
					<Link to='/shop' className='nav-item'>
						Shop
					</Link>
					<a href='#' className='nav-item'>
						Blog
					</a>
					<a href='#' className='nav-item'>
						About us
					</a>
					<a href='#' className='nav-item'>
						Contact
					</a>
				</div>
			</div>
		</div>
	);
};
