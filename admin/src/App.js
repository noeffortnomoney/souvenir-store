import { Sidebar } from './components/sidebar/Sidebar';
import { Topbar } from './components/topbar/Topbar';
import './App.scss';
import { Home } from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserList } from './pages/userList/UserList';
import { User } from './pages/user/User';
import { ProductList } from './pages/productList/ProductList';
import { Product } from './pages/product/Product';
import { NewProduct } from './pages/newProduct/NewProduct';
import { OrderList } from './pages/orderList/OrderList';
import { Order } from './pages/order/Order';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Topbar />
				<div className='container'>
					<Sidebar />
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/users' element={<UserList />} />
						<Route path='/user/:userId' element={<User />} />
						<Route path='/products/' element={<ProductList />} />
						<Route path='/product/:id' element={<Product />} />
						<Route path='/newproduct' element={<NewProduct />} />
						<Route path='/orders/' element={<OrderList />} />
						<Route path='/order/:id' element={<Order />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
