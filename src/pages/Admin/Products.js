import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom';


const Products = () => {
  const [products,setProducts] = useState([]);
  
  //get all products
const getAllProducts = async ()=>{
  try {
    const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/get-product`);
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
    toast.error('something went wrong');
  }
}
//lifecycle method
useEffect(()=>{
  getAllProducts();
},[])
  return (
    <Layout>
        <div className="container-fluid mt-3 p-3">
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
             <h1 className='text-center'>All Product List</h1>
             <div className='d-flex flex-wrap'>
             {  products?.map(p => (
              <Link to={`/dashboard/admin/products/${p.slug}`} className="product-link">
             <div className="card m-2" style={{width: '17rem'}} key={p._id}>
  <img src={`https://shopifi.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top product-image"  alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
  </div>
</div>
</Link>
             ))
             }
             </div>
        </div>
        </div>
    </div>
    </Layout>
  )
}

export default Products