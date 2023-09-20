import React,{useState,useEffect} from 'react'
import { useAuth } from '../../components/context/auth';
import { useNavigate,useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import {Select} from 'antd';
const {Option} = Select

const UpdateProduct = () => {

    const [categories,setCategories] = useState([]);
    const [photo,setPhoto] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [quantity,setQuantity] = useState("");
    const [shipping,setShipping] = useState("");
    const [pid,setPid] = useState("");
    const [catid,setCatid] = useState("");
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const params = useParams();
  
    //get single product
    const getSingleProduct = async ()=>{
        try {
            const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/get-product/${params.slug}`)
            setPid(data?.product?._id);
            setName(data?.product?.name);
            setDescription(data?.product?.description);
            setCategory(data?.product?.category);
            setCatid(data?.product?.category?._id);
            setPrice(data?.product?.price);
            setQuantity(data?.product?.quantity);
            setShipping(data?.product?.shipping);
        } catch (error) {
            console.log(error);
        }
    }

    
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
    getSingleProduct();
  }, []);

    const handleUpdate = async (e)=>{
        e.preventDefault();
        try {
         const productData = new FormData();
         productData.append("name",name);
         productData.append("description",description);
         productData.append("price",price);
         productData.append("quantity",quantity);
         photo && productData.append("photo",photo);
         productData.append("category",catid);
         productData.append("shipping",shipping);
     
          const {data} = await axios.put(`https://shopifi.onrender.com/api/v1/product/update-product/${pid}`,
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
     //handle Delete
     const handleDelete = async ()=>{
          try {
            let answer = window.prompt("Are you sure you want to delete this product ?");
            if(!answer)return;
            const {data} =await axios.delete(`https://shopifi.onrender.com/api/v1/product/${pid}`,
            {
                headers:{
                  "Authorization":auth?.token
              }});
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
            toast.error("something went wrong");
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
                <h1>Update Product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder='Select a Category' size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value);setCatid(value)}}
                  value={category.name}
                  >
                  {categories?.map((c)=>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))}
                  </Select>

                  <div className='mb-3'>
                  {photo ? (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product-photo' height={'200px'} className='img img-responsive'></img>
                      </div>
                  ) : (
                    <div className='text-center'>
                       { pid ?
                      <img src={`https://shopifi.onrender.com/api/v1/product/product-photo/${pid}`}  alt='product-photo' height={'200px'} className='img img-responsive'></img>
                      : <img src=""></img>
                       }
                      </div>
                  )
                  }
                </div>

                <div className='mb-3'>
                  <label  className='btn btn-outline-dark col-md-12'>
                  {photo ? photo.name : "Upload Photo" }
                  <input type="file" name="photo" accept="image/*" onChange={(e)=>{setPhoto(e.target.files[0])}} hidden />
                  </label>
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
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                </div>
                
                <div className='mb-3'>
                  <button className='btn btn-dark' onClick={handleUpdate}>UPDATE PRODUCT</button>
                  <button className='btn btn-dark ms-3' onClick={handleDelete}>DELETE PRODUCT</button>
                </div>
                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct