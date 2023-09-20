import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { useAuth } from '../../components/context/auth';

const Users = () => {
  const [users,setUsers] = useState([]);
  const [auth,setAuth] = useAuth();

  const getAllUsers = async ()=>{
    try {
      const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/auth/all-users`,{
        headers:{
            "Authorization":auth?.token
        }
    });
    setUsers(data?.users);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllUsers();
  },[])
  return (
    <Layout title="Dashboard - All Users">
        <div className='container-fluid mt-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>Users</h1>
                
                  
                    <div className='border-shadow'>
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody>
    {
      users?.map((u,i)=>(
        <tr>
        <th scope="row">{i+1}</th>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.phone}</td>
        <td>{u.address}</td>
      </tr>
      ))
    }
  </tbody>
</table>
</div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users