import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../components/context/auth'
import UserMenu from '../../components/layout/UserMenu';

const Dashboard = () => {
  const [auth,setAuth]=useAuth();
  return (
    <Layout title={'Dashboard - Ecommerce App'}>
       <div className='container-fluid mt-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
            <div className='card w-75 p-3'>
            <h4>User Name : {auth?.user?.name}</h4>
                <h4>User Email : {auth?.user?.email}</h4>
                <h4>User Contact : {auth?.user?.phone}</h4>
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Dashboard