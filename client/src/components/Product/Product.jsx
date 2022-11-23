import React, { useEffect, useState } from 'react';
import './Product.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../../helpers/format';

export const Product = ({ amount, newproduct, page }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					`/product/?${amount ? 'amount=' + amount : ''}${
						newproduct ? '&new=true' : ''
					} ${page ? '&page=' + page : ''} `
				);
				setProducts(res.data);
			} catch (err) {}
		};
		getProducts();
	}, [amount, newproduct, page]);

	return (
		<div className='container'>
			<div className='list-product'>
				{products &&
					products.length > 0 &&
					products.map((item, index) => (
						<div className='product-item' key={index}>
							<div className='image'>
								<Link to={'/detail/' + item._id}>
									<img src={PF + item.image} alt='' />
								</Link>

								<div className='list-action'>
									<div className='add-link'>
										<div className='action'>
											<FontAwesomeIcon
												icon={solid('cart-shopping')}
											/>
										</div>
										<div className='action'>
											<FontAwesomeIcon
												icon={solid('shuffle')}
											/>
										</div>
										<div className='action'>
											<FontAwesomeIcon
												icon={regular('heart')}
											/>
										</div>
										<div className='action'>
											<FontAwesomeIcon
												icon={solid('magnifying-glass')}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='text'>
								<div className='star'>
									<FontAwesomeIcon icon={solid('star')} />
									<FontAwesomeIcon icon={solid('star')} />
									<FontAwesomeIcon icon={solid('star')} />
									<FontAwesomeIcon icon={solid('star')} />
									<FontAwesomeIcon icon={solid('star')} />
								</div>
								<Link to={'/detail'} className='name'>
									<span>{item.name}</span>
								</Link>
								<div className='price'>
									{item && formatCurrency(item.price)}
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
