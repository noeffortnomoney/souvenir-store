import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import './FeaturedInfo.scss';

export const FeaturedInfo = () => {
	return (
		<div className='featured'>
			<div className='item'>
				<span className='title'>Revanue</span>
				<div className='money-container'>
					<span className='money'>$2,145</span>
					<span className='rate'>
						-11.4 <ArrowDownward className='icon negative' />{' '}
					</span>
				</div>
				<span className='sub'>Compared to last month</span>
			</div>
			<div className='item'>
				<span className='title'>Sales</span>
				<div className='money-container'>
					<span className='money'>$4,145</span>
					<span className='rate'>
						-11.4 <ArrowDownward className='icon negative' />{' '}
					</span>
				</div>
				<span className='sub'>Compared to last month</span>
			</div>
			<div className='item'>
				<span className='title'>Cost</span>
				<div className='money-container'>
					<span className='money'>$2,145</span>
					<span className='rate'>
						+2.4 <ArrowUpward className='icon' />
					</span>
				</div>
				<span className='sub'>Compared to last month</span>
			</div>
		</div>
	);
};
