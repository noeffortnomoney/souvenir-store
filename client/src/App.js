import { Cart } from './pages/Cart/Cart';
import { Detail } from './pages/Detail/Detail';
import { Home } from './pages/home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Shop } from './pages/Shop/Shop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Checkout } from './pages/Checkout/Checkout';

function App() {
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', '[]');
	}
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/shop' exact element={<Shop />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/checkout' element={<Checkout />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
