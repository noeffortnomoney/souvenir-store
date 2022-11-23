import React from 'react';
import { Chart } from '../../components/chart/Chart';
import { FeaturedInfo } from '../../components/featuredInfo/FeaturedInfo';
import { WidgetLg } from '../../components/widgetLg/WidgetLg';
import { WidgetSm } from '../../components/widgetSm/WidgetSm';
import { usserData } from '../../dummyData';
import './Home.scss';

export const Home = () => {
	return (
		<div className='home'>
			<FeaturedInfo />
			<Chart
				data={usserData}
				title='User Analytics'
				grid
				dataKey='Active User'
			/>
			<div className='widgets'>
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
};
