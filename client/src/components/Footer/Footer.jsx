import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export const Footer = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className='footer-wrapper'>
			<div className='footer-bottom'>
				<div className='footer-container'>
					<div className='logo'>
						<img src={PF + 'logo.png'} alt='' />
					</div>
					<div className='menu-bottom'>
						<div className='menu-item'>
							<a href='#'>Return Policy</a>
						</div>
						<div className='menu-item'>
							<a href='#'>Shipping & Delivery</a>
						</div>
						<div className='menu-item'>
							<a href='#'>Track Your Order</a>
						</div>
					</div>
					<div className='link-follow'>
						<div className='link-item'>
							<a href='#'>
								<FontAwesomeIcon icon={brands('facebook-f')} />
							</a>
						</div>
						<div className='link-item'>
							<a href='#'>
								<FontAwesomeIcon icon={brands('twitter')} />
							</a>
						</div>
						<div className='link-item'>
							<a href='#'>
								<FontAwesomeIcon icon={brands('instagram')} />
							</a>
						</div>
						<div className='link-item'>
							<a href='#'>
								<FontAwesomeIcon icon={brands('pinterest')} />
							</a>
						</div>
						<div className='link-item'>
							<a href='#'>
								<FontAwesomeIcon icon={brands('dribbble')} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
