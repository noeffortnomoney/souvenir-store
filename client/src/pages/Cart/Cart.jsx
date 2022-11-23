import React, { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './Cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';
import { formatCurrency } from '../../helpers/format';
import { Link } from 'react-router-dom';
import {
	addToCart,
	deleteProductToCart,
	getTotalCart,
	removeToCart,
} from '../../helpers/cartHelper';
import _ from 'lodash';

export const Cart = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [cart, setCart] = useState([]);

	useEffect(() => {
		setCart(JSON.parse(localStorage.getItem('cart')));
	}, []);

	return (
		<>
			<Header />
			<div
				className='slider'
				style={{
					backgroundImage: `url(${PF + 'soap-slider-1.jpg'})`,
				}}>
				<div className='text-block'>
					<h3>Cart</h3>
					<nav>
						<a href='#'>Home</a>
						<FontAwesomeIcon
							icon={solid('chevron-right')}
							className='icon'
						/>
						<span>Cart</span>
					</nav>
				</div>
			</div>

			<div className='cart-wrapper'>
				<div className='header'>cart</div>
				<div className='body'>
					{!cart || cart.length === 0 ? (
						<div className='cart-empty'>
							Your cart is currently empty
						</div>
					) : (
						<table className='list-cart'>
							<thead>
								<tr>
									<th>Product details</th>
									<th>quantity</th>
									<th>price</th>
									<th>total</th>
								</tr>
							</thead>

							<tbody>
								{cart.map((item, index) => (
									<tr key={index}>
										<td>
											<div className='info'>
												<div className='image'>
													<img
														src={
															PF +
															item.productImage
														}
														alt=''
													/>
												</div>
												<div className='detail'>
													<Link
														to={`/detail/${item.productId}`}
														className='name'>
														{item.productName}
													</Link>
													<div className='variations'>
														{item.variations &&
															!_.isEmpty(
																item.variations
															) &&
															Object.keys(
																item.variations
															).map((v) => (
																<>
																	<span className='label'>
																		{v}
																	</span>{' '}
																	:{' '}
																	<span>
																		{
																			item
																				.variations[
																				v
																			]
																		}
																	</span>
																	{' , '}
																</>
															))}
													</div>
												</div>
											</div>
										</td>
										<td>
											<div className='quantity'>
												<div
													className='icon'
													onClick={() => {
														removeToCart(item);
														setCart(
															JSON.parse(
																localStorage.getItem(
																	'cart'
																)
															)
														);
													}}>
													<FontAwesomeIcon
														icon={solid('minus')}
													/>
												</div>
												<div className='amout'>
													{item.quantity}
												</div>
												<div
													className='icon'
													onClick={() => {
														addToCart(item);
														setCart(
															JSON.parse(
																localStorage.getItem(
																	'cart'
																)
															)
														);
													}}>
													<FontAwesomeIcon
														icon={solid('plus')}
													/>
												</div>
											</div>
										</td>
										<td className='price'>
											{formatCurrency(item.productPrice)}
										</td>
										<td className='total'>
											{formatCurrency(
												item.productPrice *
													item.quantity
											)}
										</td>
										<td
											className='delete'
											onClick={() => {
												deleteProductToCart(item);
												setCart(
													JSON.parse(
														localStorage.getItem(
															'cart'
														)
													)
												);
											}}>
											<span>Xóa</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className='subtotal'>
					Subtotal : <span>{formatCurrency(getTotalCart())}</span>
				</div>
				<div className='action'>
					<Link to='/shop' className='return'>
						Return to shop
					</Link>
					<Link
						to='/checkout'
						className={`checkout + ${
							cart.length > 0 ? '' : 'disabled'
						}`}>
						Check out <FontAwesomeIcon icon={solid('right-long')} />
					</Link>
				</div>
			</div>
			<Footer />
		</>
	);
};
