import React,{useState} from 'react'
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Register = () => {
   const [name,setName]=useState("")
   const [email,setEmail]=useState("")
   const [phone,setPhone]=useState("")
   const [password,setPassword]=useState("")
   const [address,setAddress]=useState("")
   const navigate=useNavigate()
   //form function
   const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address})
    if(res.data.success){
      toast.success(res.data.message)
      navigate('/login')
    }else{
      toast.error(res.data.message)
    }
    }
    catch(error){
      console.log(error);
      toast.error("Something Went wrong")
    }
    console.log(name,email,password,address,phone);
    toast.success("Register Successfully")
   }
   return (
    <Layout>
       
    <div className='register'>
        <h1>Register Page</h1>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">

    <input type="text" value={name}
    onChange={(e)=>setName(e.target.value)} placeholder='Name' className="form-control" id="exampleInputEmail1" required/>
    <div id="emailHelp" className="form-text"></div>
  </div>

  <div className="mb-3">
  
    <input type="email" value={email}
      onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className="form-control" id="exampleInputEmail1" required />
    <div id="emailHelp" className="form-text"></div>
  </div>

  <div className="mb-3">
    <input type="password" value={password}
      onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="form-control" id="exampleInputPassword1" required/>
  </div>

  <div className="mb-3">
    
    <input type="Number" value={phone} 
      onChange={(e)=>setPhone(e.target.value)}placeholder='Phone' className="form-control" id="exampleInputEmail1" required />
    <div id="emailHelp" className="form-text"></div>
  </div>

  <div className="mb-3">

    <input type="text" value={address}
      onChange={(e)=>setAddress(e.target.value)} placeholder='Address' className="form-control" id="exampleInputEmail1" required/>
    <div id="emailHelp" className="form-text"></div>
  </div>

  <button type="submit" className="btn btn-primary" style={{margin:"0px 150px"}}>Submit</button>
</form>

    </div>
    </Layout>
  )
}

export default Register