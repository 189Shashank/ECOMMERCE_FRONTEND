import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import {Checkbox,Radio} from 'antd'
import { Prices } from "../components/Prices";
import { useNavigate,useLocation } from "react-router-dom";
import { useCart } from "../components/context/cart";
import { toast } from "react-toastify";
import { useAuth } from "../components/context/auth";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] = useState(0);
  const [homepage,setHomepage] = useState(1);
  const [filterpage,setFilterpage] = useState(1);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cart,setCart] = useCart();
  const [auth,setAuth] = useAuth();

  let userid=auth?.user?._id;
  


  //get total products count of home page
  const getTotal = async ()=>{
    try {
      const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }

  //get total products count of filtered page
  const getfilterTotal = async ()=>{
    try {
      const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/product/filter-product-count`,{checked,radio});
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }
  
//load more for home page
const loadmore = async ()=>{
  try {
    setLoading(true);
    const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/product/product-list/${homepage}`);
    setLoading(false);
    setProducts([...products,...data?.products])
  } catch (error) {
    setLoading(false);
    console.log(error)
  }
}
useEffect(()=>{
  if(homepage===1)return;
  loadmore();
},[homepage])

//loadmore for filtered products
const filterloadmore = async ()=>{
  if(filterpage===1)return;
  try {
    setLoading(true);
    const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/product/product-filters/${filterpage}`,{checked,radio});
    setLoading(false);
    setProducts([...products,...data?.products])
  } catch (error) {
    setLoading(false);
    console.log(error)
  }
}

//get all categories
const getAllcategory = async () => {
  try {
    const res = await axios.get(
      `https://shopifi.onrender.com/api/v1/category/get-category`
    );
    if (res?.data?.success) {
      setCategories(res?.data?.category);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getAllcategory();
}, []);

useEffect(()=>{
  if(checked.length==0 && radio.length==0)
  {
  getTotal();
  getAllProducts();
  }
},[checked,radio])

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      setHomepage(1);
      setProducts([])
      const { data } = await axios.post(
        `https://shopifi.onrender.com/api/v1/product/product-list/1`
      );
      setLoading(false);
      setProducts(data?.products);
      getTotal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  

  //filter by category
  const handleFilter = (value,id)=>{
    let all = [...checked];
    if(value)
    {
      all.push(id);
    }else
    {
      all = all.filter(c => c!==id)
    }
    setChecked(all);
  }
  //get filtered product
  const filterProduct = async () => {
    try {
      setLoading(true);
      setFilterpage(1);
      setProducts([]);
      const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/product/product-filters/1`,
      {checked,radio}
      )
      setLoading(false)
      setProducts(data?.products);
      getfilterTotal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    if(checked.length>0 || radio.length>0)
    {  
      filterProduct();
    }
  },[checked,radio])

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center mt-1">Filter By Category</h4>
            <div className="d-flex flex-column ms-5 mt-1">
            { 
              categories?.map(c=>(
                <Checkbox key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
                   {c.name}
                </Checkbox>
              ))
            }
            </div>
            {/* Price Filter */}
            <h4 className="ms-5 mt-2">Filter By Price</h4>
            <div className="d-flex flex-column ms-5 mt-1">
            <Radio.Group onChange={(e)=>{setRadio(e.target.value)}}>
              {  
              Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
                ))
              }
            </Radio.Group>
            </div>
            <div className="d-flex flex-column ms-3 mt-3 mb-2 me-2">
              <button className="btn btn-dark" onClick={()=>{window.location.reload()}}>RESET FILTERS</button>
            </div>
          </div>
          <div className="col-md-9">
            
            <h1 className="text-center">All Products</h1>
            
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
                    {auth?.user?.role==1 ? <></> : <button class="btn btn-dark ms-2"
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
            <div className="m-2 p-2">
            {
              products && products.length < total && (
                <button className="btn btn-dark"
                onClick={(e)=>{
                   e.preventDefault();
                   if(!checked.length && !radio.length)
                   {
                    setHomepage(homepage+1);
                   }else if(checked.length>0 || radio.length>0)
                   {
                     setFilterpage(filterpage+1);
                     filterloadmore();
                   }
                }}>
                 {loading ? "loading..." : "loadmore"}
                </button>
              )
            }
            
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
