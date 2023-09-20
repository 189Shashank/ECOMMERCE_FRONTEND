
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CategoryWiseProducts from './pages/CategoryWiseProducts';
import Cart from './pages/Cart';
import { useAuth } from './components/context/auth';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
  const [auth,setAuth] = useAuth();
  return (
    <>
     <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/product/:slug' element={<ProductDetails/>} />
     <Route path='/category/:slug' element={<CategoryWiseProducts/>} />
     <Route path='/search' element={<Search/>} />
     <Route path='/cart' element={<Cart/>} />
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>} />
      <Route path='user/profile' element={<Profile/>} />
      <Route path='user/orders' element={<Orders/>} />
      <Route path='' element={<PageNotFound/>} />
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
       <Route path='admin' element={<AdminDashboard/>} />
       <Route path='admin/create-category' element={<CreateCategory/>} />
       <Route path='admin/create-product' element={<CreateProduct/>} />
       <Route path='admin/products/:slug' element={<UpdateProduct/>} />
       <Route path='admin/users' element={<Users/>} />
       <Route path='admin/products' element={<Products/>} />
       <Route path='admin/orders' element={<AdminOrders/>} />
       <Route path='' element={<PageNotFound/>} />
      </Route>
      <Route path='/register' element={auth.token?<Home/>:<Register/>} />
      <Route path='/login' element={auth.token?<Home/>:<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='/*' element={<PageNotFound/>} />
     </Routes>
    </>
  );
}

export default App;
