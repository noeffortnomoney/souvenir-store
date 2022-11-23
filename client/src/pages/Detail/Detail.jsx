import React, { useRef, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import './Detail.scss';
import { Footer } from '../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { formatCurrency } from '../../helpers/format';
import { addToCart, checkProductInCart } from '../../helpers/cartHelper';
import _ from 'lodash';

export const Detail = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [variations, setVariations] = useState({});
	const [isInCart, setIsInCart] = useState(false);
	const [isSelect, setIsSelect] = useState(false);

	const id = useParams().id;

	useEffect(() => {
		const getProduct = async () => {
			const res = await axios.get('/product/' + id);

			setProduct(res.data);
		};
		getProduct();
	}, [id]);

	useEffect(() => {
		if (product.variations && !_.isEmpty(product.variations)) {
			const productVariations = {};
			Object.keys(product.variations).forEach((item) => {
				productVariations[item] = null;
			});
			setVariations(productVariations);
		}
	}, [product]);

	useEffect(() => {
		setIsInCart(checkProductInCart(product._id));
	}, [product]);

	const handleChangeVariations = (e, variation) => {
		variations[variation] = e.target.value;
		if (!_.values(variations).some(_.isEmpty)) {
			setIsSelect(true);
		}
	};

	const handleAddToCart = () => {
		const productInfo = {
			productId: product._id,
			productName: product.name,
			productPrice: product.price,
			productImage: product.image,
			quantity,
			variations,
		};

		addToCart(productInfo);
		setIsInCart(true);
	};

	return (
		<>
			<Header />
			<div
				className='slider'
				style={{
					backgroundImage: `url(${PF + 'soap-slider-1.jpg'})`,
				}}>
				<div className='text-block'>
					<h3>Shop</h3>
					<nav>
						<Link to='/'>Home</Link>
						<FontAwesomeIcon
							icon={solid('chevron-right')}
							className='icon'
						/>
						<span>Shop</span>
					</nav>
				</div>
			</div>
			<div className='detail-wrapper'>
				{isInCart && (
					<div className='added-product'>
						<div className='message'>
							<FontAwesomeIcon
								icon={solid('circle-check')}
								className='check-icon'
							/>
							<span className='product-name'>
								"{product.name}"{' '}
							</span>
							<span>has been added to your cart.</span>
						</div>

						<Link to='/cart' className='view-cart'>
							<span>view cart</span>
						</Link>
					</div>
				)}
				<div className='content'>
					<div className='image'>
						<img src={product.image && PF + product.image} alt='' />
					</div>
					<div className='info'>
						<h1>{product.name}</h1>
						<div className='star'>
							<FontAwesomeIcon icon={solid('star')} />
							<FontAwesomeIcon icon={solid('star')} />
							<FontAwesomeIcon icon={solid('star')} />
							<FontAwesomeIcon icon={solid('star')} />
							<FontAwesomeIcon icon={solid('star')} />
						</div>
						<div className='price'>
							{formatCurrency(product.price)}
						</div>
						<div className='desc'>{product.desc}</div>
						{product.variations && (
							<table className='variations'>
								<tbody>
									{Object.keys(product.variations).map(
										(item, index) => (
											<tr key={index}>
												<td className='label'>
													{item}
												</td>
												<td className='value'>
													<select
														name='variation'
														id='vari-value'
														defaultValue={''}
														onChange={(e) =>
															handleChangeVariations(
																e,
																item
															)
														}>
														<option
															disabled
															value={''}>
															--- Chọn ---
														</option>
														{product.variations[
															item
														].map(
															(value, index) => (
																<option
																	value={
																		value
																	}
																	key={index}>
																	{value}
																</option>
															)
														)}
													</select>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						)}
						<div className='action'>
							<div className='quantity'>
								<span
									className='plus'
									onClick={() => setQuantity(quantity + 1)}>
									<FontAwesomeIcon icon={solid('angle-up')} />
								</span>
								<input
									type='number'
									value={quantity}
									step='1'
									min={1}
									className='amount'
									onChange={(e) =>
										setQuantity(e.target.value)
									}
								/>
								<span
									className='minus'
									onClick={() =>
										quantity > 1
											? setQuantity(quantity - 1)
											: 1
									}>
									<FontAwesomeIcon
										icon={solid('angle-down')}
									/>
								</span>
							</div>

							<button
								className={`add-to-cart ${
									isSelect || _.isEmpty(variations)
										? ''
										: 'disabled'
								}`}
								onClick={() => handleAddToCart()}>
								add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
