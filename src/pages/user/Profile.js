import React,{useState,useEffect} from 'react'
import UserMenu from '../../components/layout/UserMenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../components/context/auth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [uid,setUid] = useState("");
    const [auth,setAuth] = useAuth();

    //get user data
    useEffect(()=>{
      const {email,phone,name,address,_id} = auth?.user;
      setName(name);
      setPhone(phone);
      setAddress(address);
      setEmail(email);
      setUid(_id);
    },[auth?.user])
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.put(`https://shopifi.onrender.com/api/v1/auth/profile`,
            {name,email,password,phone,address,uid},
            {
                headers:{
                    "Authorization":auth?.token
                }
            });
            if(res?.data?.success){
                setAuth({...auth,user:res?.data?.updateduser})
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user=res?.data?.updateduser;
                localStorage.setItem('auth',JSON.stringify(ls));
            
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
    <Layout title="Dashboard - User Profile">
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3 mt-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9 mt-1 mb-1'>
            <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">USER PROFILE</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter Name"
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
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Change Password [OPTIONAL]"
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
            />
          </div>
          <button type="submit" className="btn btn-primary " style={{width:'293px'}}>
            UPDATE
          </button>
        </form>
      </div>

            </div>
        </div>
        </div>
        </Layout>
  )
}

export default Profile