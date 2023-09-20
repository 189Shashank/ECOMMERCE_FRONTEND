import React,{useState,useEffect} from 'react'
import { useAuth } from '../../components/context/auth';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import {Select} from 'antd';
const {Option} = Select


const CreateProduct = () => {
  const [categories,setCategories] = useState([]);
  const [photo,setPhoto] = useState("");
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [quantity,setQuantity] = useState("");
  const [shipping,setShipping] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();

//get all category
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
    toast.error("something went wrong in getting category");
  }
};

useEffect(() => {
  getAllcategory();
}, []);

//create product 
const handleCreate = async (e)=>{
   e.preventDefault();
   try {
    const productData = new FormData();
    productData.append("name",name);
    productData.append("description",description);
    productData.append("price",price);
    productData.append("quantity",quantity);
    productData.append("photo",photo);
    productData.append("category",category);
    productData.append("shipping",shipping);

     const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/product/create-product`,
     productData,
     {
      headers:{
        "Authorization":auth?.token
    }}
     )
     if(data?.success)
     {
       navigate('/dashboard/admin/products')
       setTimeout(() => {
        toast.success(data?.message);
    }, 100);
     }else
     {
         toast.error(data?.message);
     }
   } catch (error) {
    console.log(error);
    toast.error('something went wrong');
   }
}

  return (
    <Layout title="Dashboard - Create Product">
        <div className='container-fluid mt-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>Create Product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder='Select a Category' size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                  {categories?.map((c)=>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))}
                  </Select>

                <div className='mb-3'>
                  <label  className='btn btn-outline-dark col-md-12'>
                  {photo ? photo.name : "Upload Photo" }
                  <input type="file" name="photo" accept="image/*" onChange={(e)=>{setPhoto(e.target.files[0])}} hidden />
                  </label>
                </div>
                
                <div className='mb-3'>
                  {photo && (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product-photo' height={'200px'} className='img img-responsive'></img>
                      </div>
                  )}
                </div>
                <div className='mb-3' >
                  <input  type="text" value={name} placeholder="write a name" className='form-control' onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className='mb-3' >
                  <textarea  type="text" value={description} placeholder="write a description" className='form-control' onChange={(e)=> setDescription(e.target.value)} />
                </div>
                <div className='mb-3' >
                  <input  type="number" value={price} placeholder="write a price" className='form-control' onChange={(e)=> setPrice(e.target.value)} />
                </div>
                <div className='mb-3' >
                  <input  type="text" value={quantity} placeholder="write a quantity" className='form-control' onChange={(e)=> setQuantity(e.target.value)} />
                </div>
                <div className='mb-3' >
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                </div>
                
                <div className='mb-3'>
                  <button className='btn btn-dark' onClick={handleCreate}>CREATE PRODUCT</button>
                </div>
                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct