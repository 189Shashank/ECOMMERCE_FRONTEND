import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../components/context/auth';
import moment from 'moment';
import axios from 'axios';

const Orders = () => {
  const [orders,setOrders] = useState([]);
  const [auth,setAuth] = useAuth();

  const getOrders = async ()=>{
    try {
      const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/auth/orders`,
      {
        headers:{
            "Authorization":auth?.token
        }
      });
      setOrders(data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getOrders();
  },[auth?.token])
  return (
    <Layout title="Dashboard - Orders">
        <div className='container-fluid mt-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Orders</h1>
                {
                  orders?.map((o,i)=>{
                    return(
                      <div className='border shadow'>
                        <table className='table'>
                           <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Status</th>
                              <th scope="col">Buyer</th>
                              <th scope="col">Orders</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Quantity</th>
                            </tr>
                           </thead>
                           <tbody>
                            <tr>
                              <td>{i+1}</td>
                              <td>{o?.status}</td>
                              <td>{o?.buyer?.name}</td>
                              <td>{moment(o?.createdAt).fromNow()}</td>
                              <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                              <td>{o?.products?.length}</td>
                            </tr>
                           </tbody>
                        </table>
                        <div className='container'>
                        {
                    o?.products?.map((p,i)=>(
                        <div className='row m-4 p-2 card flex-row'>
                        <div className='col-md-4'>
                        <img
                    src={`https://shopifi.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top product-image"
                    alt={p.name}
                  />
                        </div>
                        <div className='col-md-8'>
                            <h6>{p.name}</h6>
                            <h6>{p.description}</h6>
                            <h6>Price : ₹{p.price}</h6>
                        </div>
                        </div>
                    ))
                }
                          </div>
                      </div>
                    )
                  })
                }
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Orders