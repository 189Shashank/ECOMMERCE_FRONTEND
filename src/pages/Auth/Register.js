import React,{useState} from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/AuthStyle.css'
import Layout from "../../components/layout/Layout";

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`https://shopifi.onrender.com/api/v1/auth/register`,
            {name,email,password,phone,address,answer});
            if(res.data.success){
                navigate('/login');
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
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">Register</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter Name"
              required
            />
          </div>
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
          <div className="mb-3">
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
              type="text"
              className="form-control"
              id="exampleInputPhone"
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}
              placeholder="Enter Phone No"
              required
            />
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              value={address}
              onChange={(e)=>{setAddress(e.target.value)}}
              placeholder="Enter Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
