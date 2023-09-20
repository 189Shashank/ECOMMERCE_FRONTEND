
import React, { useState,useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../components/context/cart'
import { useAuth } from '../components/context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-toastify'

const Cart = () => {
    const [cart,setCart] = useCart();
    const [auth,setAuth] = useAuth();
    const [clientToken,setClientToken] = useState("")
    const [instance,setInstance] = useState("");
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    let userid = auth?.user?._id;

    //total price
   const totalPrice = ()=>{
    try {
        let total =0;
        cart?.map((item)=>(
           total = total + item.price
        ));
        return total;
    } catch (error) {
        console.log(error);
    }
   }
    //delete item
    const removeCartItem = (pid)=>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id===pid)
            myCart.splice(index,1);
            setCart(myCart);
            localStorage.setItem(userid,JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    //get payment gateway token
    const getToken = async ()=>{
        try {
            const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
      getToken();
    },[auth?.token])

    //handle payment
    const handlePayment = async ()=>{
        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post(`https://shopifi.onrender.com/api/v1/product/braintree/payment`,{nonce,cart},
            {
                headers:{
                    "Authorization":auth?.token
                }
            }
            )
            localStorage.removeItem(auth?.user?._id);
            setCart([]);
            setTimeout(() => {
                toast.success('Payment Completed Successfully');
            }, 100);
            navigate('/dashboard/user/orders');
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }
  return (
    <Layout title={ 'Your Cart' }>
        <div className='container-fluid mt-1'>
        <div className='row'>
            <div className='col-md-12'>
                  <h1 className='text-center bg-dark text-light p-2 mb-1'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                  <h4 className='text-center mb-4'>
                  { auth?.token ?
                  cart?.length ? `You have ${cart?.length} products in your cart` : 'Your Cart is Empty' 
                  : "Please Login to Check Your Cart"}
                  </h4>
            </div>
        </div>
        <div className='row'>
              <div className='col-md-7'>
                {
                    cart?.map(p=>(
                        <div className='row mb-3 ms-4 p-2 card flex-row'>
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
                            <button className='btn btn-dark mt-2'
                            onClick={()=>removeCartItem(p._id)}>REMOVE</button>
                        </div>
                        </div>
                    ))
                }
              </div>
              {auth?.token &&
              <div className='col-md-4 text-center ms-5'>
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr></hr>
                <h4>Total : ₹ {totalPrice()}</h4>
                <h5>Checkout Address : </h5>
                <p>{auth?.user?.address}</p>
                <button className='btn btn-outline-dark' 
                onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                <br></br>

                <div className='mt-2'>
                    {
                        !clientToken || !cart?.length ? ("") :
                        <>
                         <DropIn 
                    options={{
                        authorization: clientToken,
                    }}
                    onInstance={instance => setInstance(instance)}
                    />
                    <button className='btn btn-outline-warning'
                    onClick={handlePayment}
                    disabled = { loading || !instance || !auth?.user?.address}
                    >
                        {loading ? "Processing....." : 'Make Payment'}
                    </button>
                        </>
                    }
                </div>
              </div>
}
        </div>
        </div>
    </Layout>
  )
}

export default Cart