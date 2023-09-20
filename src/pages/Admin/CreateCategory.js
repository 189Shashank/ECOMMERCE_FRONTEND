import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../components/context/auth";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  const [auth,setAuth] = useAuth();
  const [visible,setVisible] = useState(false);
  const [selected,setSelected]=useState(null);
  const [updatedname,setUpdatedname]=useState("");

  //handle form
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
       const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/category/create-category`,{name},{
        headers:{
          "Authorization":auth?.token
      }},
       )
       if(data?.success)
       {
        toast.success(data.message);
        setName("");
        getAllcategory();
       }else
       {
        toast.error(data.message);
       }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
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
      toast.error("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllcategory();
  }, []);

  //handle update category
  const handleUpdate = async (e)=>{
   e.preventDefault();
   try {
      const {data} = await axios.put(`https://shopifi.onrender.com/api/v1/category/update-category/${selected._id}`,{name:updatedname},
      {
        headers:{
          "Authorization":auth?.token
      }});
     if(data?.success)
     {
      toast.success(data.message);
      setSelected(null);
      setUpdatedname("");
      setVisible(false);
      getAllcategory();
     }else{
      toast.error(data.message);
     }
   } catch (error) {
    console.log(error);
    toast.error("something went wrong");
   }
  }

//delete category
const handleDelete = async (pid)=>{
  try {
     const {data} = await axios.delete(`https://shopifi.onrender.com/api/v1/category/delete-category/${pid}`,
     {
       headers:{
         "Authorization":auth?.token
     }});
    if(data?.success)
    {
     toast.success(data.message);
     getAllcategory();
    }else{
     toast.error(data.message);
    }
  } catch (error) {
   console.log(error);
   toast.error("something went wrong");
  }
 }

  return (
    <Layout title="Dashboard - Create Category">
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {categories?.map((c) => (
                      <>
                        <tr>
                        <td key={c._id}>{c.name}</td>
                        <td><button className="btn btn-dark ms-2" 
                        onClick={()=>{setVisible(true); setUpdatedname(c.name); setSelected(c)}}> EDIT </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-dark ms-2" onClick={()=>{handleDelete(c._id)}}> DELETE </button>
                        </td>
                        </tr>
                      </>
                    ))}
    
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=> setVisible(false)} 
            footer={null}
            visible={visible}>
              <CategoryForm value={updatedname} setValue={setUpdatedname} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
