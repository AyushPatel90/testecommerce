import React,{useState} from 'react'
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { set } from 'mongoose';
const Login = () => {
    
   const [email,setEmail]=useState("")
   
   const [password,setPassword]=useState("")
   
   const[auth,setAuth]=useAuth()
   const navigate=useNavigate()
   const location=useLocation()
   //form function
   const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
    if(res && res.data.success){
      toast.success(res.data.message)
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token,
      });
      localStorage.setItem('auth',JSON.stringify(res.data));
      navigate(location.state||'/')
    }else{
      toast.error(res.data.message)
    }
    }
    catch(error){
      console.log(error);
      toast.error("Something Went wrong")
    }
    console.log(email,password);
    toast.success("Register Successfully")
   }
  return (
    <Layout>
       
    <div className='register'>
        <h1>Login Page</h1>
    <form onSubmit={handleSubmit}>

  <div className="mb-3">
  
    <input type="email" value={email}
      onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className="form-control" id="exampleInputEmail1" required />
    <div id="emailHelp" className="form-text"></div>
  </div>

  <div className="mb-3">
    <input type="password" value={password}
      onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="form-control" id="exampleInputPassword1" required/>
  </div>

  <button type="submit" className="btn btn-primary" style={{margin:"0px 150px"}}>Login</button>
</form>

    </div>
    </Layout>
  )
}

export default Login