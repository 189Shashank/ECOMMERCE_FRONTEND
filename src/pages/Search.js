import React from 'react'
import { useSearch } from '../components/context/search'
import Layout from '../components/layout/Layout'
import { useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/cart';
import { toast } from 'react-toastify';

const Search = () => {
    const [values,setValues] = useSearch();
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const userid = auth?.user?._id;

  return (
    <Layout title={'Search results'}>
     <div className='text-center'>
        <h1>Search Results</h1>
        <h6>{ values?.results?.length < 1 ? 'No Products Found' : `Found ${values?.results?.length}`}</h6>
        <div className="d-flex flex-wrap mt-4">
              {
               values?.results?.map((p) => (
               
                <div
                  className="card m-2"
                  style={{ width: "17rem" }}
                  key={p._id}
                >
                  <img
                    src={`https://shopifi.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top product-image"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">₹ {p.price}</p>
                    <button class="btn btn-dark"
                    onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    {auth?.user?.role==0 && <button class="btn btn-dark ms-2"
                    onClick={()=>{
                      if(auth?.user == null)
                      {
                        setTimeout(() => {
                          toast.error('Please Login to ADD Product');
                        }, 100);
                        navigate('/login',{
                          state:location.pathname,
                      })
                        return;
                      }
                      setCart([...cart,p]);
                      localStorage.setItem(userid,JSON.stringify([...cart,p]));
                      toast.success('Product Added to Cart')
                    }}>Add To Cart</button>}
                  </div>
                </div>
    
            ))
             }
            </div>
     </div>
    </Layout>
  )
}

export default Search