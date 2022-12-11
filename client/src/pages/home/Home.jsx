import { Header } from '../../components/Header/Header';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { Product } from '../../components/Product/Product';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<>
			<Header />
			<div className='home-container'>
				<div className='content'>
					<div className='list-content'>
						<div className='content-item'>
							<FontAwesomeIcon
								className='icon'
								icon={solid('gift')}
							/>
							<h3 className='heading'>Find something you love</h3>
							<span className=''>
								Our marketplace is a world of vintage and
								handmade goods
							</span>
						</div>
						<div className='content-item'>
							<FontAwesomeIcon
								className='icon'
								icon={regular('star')}
							/>
							<h3 className='heading'>Meet talented artisans</h3>
							<span className=''>
								Our marketplace is a world of vintage and
								handmade goods
							</span>
						</div>
						<div className='content-item'>
							<FontAwesomeIcon
								className='icon'
								icon={solid('lock')}
							/>
							<h3 className='heading'>
								Buy and sell with confidence
							</h3>
							<span className=''>
								Our marketplace is a world of vintage and
								handmade goods
							</span>
						</div>
					</div>
				</div>
				<div className='shop'>
					<div className='shop-header'>
						<div className='heading'>
							<h5>Mua ngay</h5>
							<h3>Chọn sản phẩm mà bạn muốn</h3>
							<div className='tab-list'>
								<div className='tab'>
									<a href='#'>
										<span>Bán chạy nhất</span>
									</a>
								</div>
								<div className='tab'>
									<a href='#'>
										<span>Sản phẩm mới</span>
									</a>
								</div>
								<div className='tab'>
									<a href='#'>
										<span>Sản phẩm giảm giá</span>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className='shop-container'>
						<Product newproduct={true} amount={4} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
