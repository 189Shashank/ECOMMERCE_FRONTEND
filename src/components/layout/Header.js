import React from 'react'
import { useAuth } from '../context/auth'
import {NavLink,Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaShoppingBasket} from 'react-icons/fa'
import SearchInput from '../Form/SearchInput'
import useCategory from './../../hooks/useCategory';
import { useCart } from '../context/cart'
import {Badge} from 'antd'




const Header = () => {
  const [auth,setAuth] = useAuth();
  const categories = useCategory();
  const [cart,setCart] = useCart();
  const handleLogout = ()=>{
    setAuth({
      ...auth,user:null,token:''
    })
    setCart([]);
    const data = localStorage.getItem('auth')
    const name=JSON.parse(data).user.name;
    localStorage.removeItem('auth');
    setTimeout(() => {
      toast.success(`${name} Logout Successfully`);
  }, 100);

  }
  var nam= auth?.user?.name;
  var str="NULL"
  if(nam)
   str=nam.toUpperCase();

  return (
   <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link  className="navbar-brand" ><FaShoppingBasket style={{color:"black",height:"40px",width:"40px"}}/>  ECOMMERCE APP </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput />
        <li className="nav-item">
          <NavLink to="/" className="nav-link" >HOME</NavLink>
        </li> 
         <div className="dropdown">
  <button className="btn dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
    CATEGORY
  </button>
  <ul className="dropdown-menu dropdown-menu-dark">
    {categories?.map(c=>(
      
      <li><NavLink to={`/category/${c.slug}`} className="dropdown-item" >{c.name}</NavLink></li>
      
    ))
     }
      </ul>
      </div>
        {
          !auth.user ? 
          (
            <>
            <li className="nav-item">
          <NavLink to="/register" className="nav-link" >REGISTER</NavLink>
           </li>
            <li className="nav-item">
          <NavLink to="/login" className="nav-link" >LOGIN</NavLink>
            </li>
            </>
          ) 
          : 
          (
          <>
         <div className="dropdown">
  <button className="btn dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
    {str}
  </button>
  <ul className="dropdown-menu dropdown-menu-dark">
    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" >Dashboard</NavLink></li>
    <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item" >Logout</NavLink></li>
  </ul>
      </div>
          </>)
        }
        {auth?.user?.role==1 ? <li></li> : <li className="nav-item">
        <Badge count={cart?.length} showZero style={{backgroundColor:'black',color:'white'}}>
        <NavLink to="/cart" style={{color:'black',textDecoration:'none',fontWeight:'800',
        fontSize:'18px',position:'relative',top:'9px'}}>CART</NavLink>
    </Badge>
        </li>}
      </ul>
    </div>
  </div>
</nav>

   </>
  )
}

export default Header