import React,{useState} from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import '../../styles/AuthStyle.css'
import Layout from '../../components/layout/Layout'
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/auth";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [auth,setAuth] = useAuth();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`https://shopifi.onrender.com/api/v1/auth/login`,
            {email,password});
            if(res.data.success){
              setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
              });
              
              localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || '/');
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 100);
            }else
            {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
        
    }

  return (
    <Layout title={"Login - Ecommerce App"}>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h1 className="title">Login</h1>
       
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
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Enter Password"
            required
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div className='forgot'>
        <Link to='/forgot-password'>
          Forgot Password
        </Link>
        </div>
        
      </form>
    </div>
  </Layout>
  )
}

export default Login