import React,{useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import Layout from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const [answer,setAnswer]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const navigate=useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`https://shopifi.onrender.com/api/v1/auth/forgot-password`,
            {email,answer,newPassword});
            console.log(res);
            if(res.data.success)
            {   navigate('/login')
               setTimeout(() => {
                toast.success(res.data.message);
               }, 100);
            }
            else
            {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
        
    }

  return (
    <Layout title={"Forgot Password "}>
    <div className="form-container">
      <form >
      <h1 className="title" style={{fontSize:'35px'}}>Reset Password</h1>
       
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail"
            value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Enter Email"
            required
          />
        </div>
        < div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputSecretKey"
              value={answer}
              onChange={(e)=>{setAnswer(e.target.value)}}
              placeholder="Enter Your Lucky Number"
              required
            />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            value={newPassword}
              onChange={(e)=>{setNewPassword(e.target.value)}}
            placeholder="Enter New Password"
            required
          />
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  </Layout>
  )
}

export default ForgotPassword