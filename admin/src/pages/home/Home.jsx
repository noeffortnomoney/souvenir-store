import React from 'react';
import { FeaturedInfo } from '../../components/featuredInfo/FeaturedInfo';
import { WidgetLg } from '../../components/widgetLg/WidgetLg';
import { WidgetSm } from '../../components/widgetSm/WidgetSm';
import { usserData } from '../../dummyData';
import './Home.scss';

export const Home = () => {
	return (
		<div className='home'>
			<FeaturedInfo />
			<div className='widgets'>
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
};
