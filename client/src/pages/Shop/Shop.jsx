import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import './Shop.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { Product } from '../../components/Product/Product';
import { Footer } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Shop = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [pageCur, setPageCur] = useState(1);
	const [totalPage, setTotalPage] = useState(2);

	useEffect(() => {
		const getTotalPage = async () => {
			const res = await axios.get('/product/pages');
			setTotalPage(res.data.totalPage);
		};
		getTotalPage();
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
			<div className='shop-container'>
				<div className='content'>
					<div className='left-bar'>
						<div className='category'>
							<h3 className='title'>
								<span>categories</span>
							</h3>
							<ul className='categories-list'>
								<li className='category-item'>
									<a href='#'>Funny Gifts</a>
								</li>
								<li className='category-item'>
									<a href='#'>Gifts Bundle</a>
								</li>
								<li className='category-item'>
									<a href='#'>Gifts Ideas</a>
								</li>
								<li className='category-item'>
									<a href='#'>Home Decor</a>
								</li>
							</ul>
						</div>
						<div className='filter'>
							<h3 className='title'>
								<span>filter</span>
							</h3>

							<ul className='list'></ul>
						</div>
					</div>
					<div className='product-content'>
						<div className='tool-bar'>
							<div className='left-tool'>
								<div className='view-mod'>
									<div className='icon active'>
										<FontAwesomeIcon
											icon={solid('table-cells-large')}
										/>
									</div>
									<div className='icon'>
										<FontAwesomeIcon icon={solid('list')} />
									</div>
								</div>
								<div className='ordering'>
									<select>
										<option value='' selected>
											Default Sorting
										</option>
										<option value='' selected>
											Sort by popularity
										</option>
										<option value='' selected>
											Sort by average rating
										</option>
										<option value='' selected>
											Sort by latest
										</option>
										<option value='' selected>
											Sort by price: low to high
										</option>
										<option value='' selected>
											Sort by price: high to low
										</option>
									</select>
								</div>
							</div>
							<div className='pagination'>
								<span className='label'>PAGE: </span>
								<div className='page-list'>
									<div
										className={`prev btn ${
											pageCur === 1 ? 'disabled' : ''
										}`}
										onClick={() => {
											setPageCur(pageCur - 1);
										}}>
										<FontAwesomeIcon
											icon={solid('arrow-left')}
											className='icon'
										/>
									</div>

									<div
										className={`page btn ${
											pageCur !== totalPage
												? 'active'
												: ''
										}`}
										onClick={() => {
											setPageCur(pageCur - 1);
										}}>
										{pageCur < totalPage
											? pageCur
											: pageCur - 1}
									</div>
									<div
										className={`page btn ${
											pageCur === totalPage
												? 'active'
												: ''
										}`}
										onClick={() => {
											setPageCur(pageCur + 1);
										}}>
										{pageCur < totalPage
											? pageCur + 1
											: pageCur}
									</div>
									<div
										className={`next btn ${
											totalPage === pageCur
												? 'disabled'
												: ''
										}`}
										onClick={() => {
											setPageCur(pageCur + 1);
										}}>
										<FontAwesomeIcon
											icon={solid('arrow-right')}
											className='icon'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='list-product'>
							<Product page={pageCur} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
