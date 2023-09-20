import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/cart';
import { toast } from 'react-toastify';


const CategoryWiseProducts = () => {
    const params= useParams();
    const [category,setCategory] = useState({});
    const [products,setProducts] = useState([]);
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const userid = auth?.user?._id;

    //get single category
    const getCategory = async ()=>{
        try {
            const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/category/single-category/${params.slug}`)
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
      getCategory();
      getAllProducts();
    },[params.slug,category._id])
    
    //get all products based on a particular category
    const getAllProducts = async ()=>{
        try {
           const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/filter-product/${category._id}`);
           setProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout title={params.slug}>
            
            <h1 className="text-center mt-2">{category?.name}</h1>
            
            <div className="d-flex flex-wrap">
              {
               products?.map((p) => (
               
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
    </Layout>
    
  )
}

export default CategoryWiseProducts