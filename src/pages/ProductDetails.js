import axios from 'axios'
import Layout from '../components/layout/Layout'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate,useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/cart';


const ProductDetails = () => {
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relatedProducts,setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();
    const userid = auth?.user?._id;

    //get product details
    const getProduct = async ()=>{
        try {
            const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/get-product/${params?.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product._id,data?.product?.category._id);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(params?.slug)
       getProduct();
    },[params?.slug])

    //get similar products
    const getSimilarProduct = async (pid,cid)=>{
     try {
        const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/related-product/${cid}/${pid}`)
        setRelatedProducts(data?.products);
     } catch (error) {
        console.log(error)
     }
    }
  return (
    <Layout>
        <div className='container-fluid mt-3 p-3'>
       <div className='row'>
        <div className='col-md-6'>
            {product ?
         <img 
                    src={`https://shopifi.onrender.com/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top product-image"
                    alt={product.name}
                  />
                  :
           <img src=""></img>
            }
        </div>
        <div className='col-md-6'>
          <h2>Product Details</h2>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h5>Category : {product.category?.name}</h5>
          <h5>Quantity : {product.quantity}</h5>
          <h5>Shipping : {product.shipping ? "YES" : "NO" } </h5>
          {auth?.user?.role==0 && <button class="btn btn-dark mt-2"
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
                      setCart([...cart,product]);
                      localStorage.setItem(userid,JSON.stringify([...cart,product]));
                      toast.success('Product Added to Cart')
                    }}>Add To Cart</button>}
        </div>
       </div>
       <br></br>
       <hr></hr>
       <div className='row'>
       <h3>Similar Products</h3>
       {relatedProducts.length<1 && (<h4 className='text-center'>No Similar Product Found</h4>)}
       <div className="d-flex flex-wrap">
              {
               relatedProducts?.map((p) => (
               
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
                    { auth?.user?.role==0 && <button class="btn btn-dark ms-2"
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
       </div>
    </Layout>
  )
}

export default ProductDetails