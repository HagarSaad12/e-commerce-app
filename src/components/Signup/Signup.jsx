import React, { useState } from 'react'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
export default function Signup() {
  let navigate=useNavigate();
  let [isLoading,setLoading]=useState(false);
  let [errMsg,setMSG]=useState(null);
  // function validate(values){
  //   let errors={};
  //   if(!values.name){
  //     errors.name='name is required';
  //   }
  //   else if(values.name.length<3){
  //     errors.name='lenght must be >3';
  //   }
  //   else if(values.name.length>10){
  //     errors.name='max length is 10';
  //   }
  //    if(!values.phone){
  //     errors.phone='phone is required';
  //    }
  //    else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
  //     errors.phone='enter valid phone number';
  //    }
  //     if(!values.email){
  //       errors.email='email is required';
  //     }
  //     else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //       errors.email='enter valid email';
  //     }
  //     if(!values.password){
  //       errors.password='password is required';
  //     }
  //     else if(!/^[A-Z][a-z0-9]{6,10}$/.test(values.password)){
  //       errors.password='enter valid password';
  //     }

  //     if(!values.rePassword){
  //       errors.rePassword='confirm password';
  //     }
  //     else if(values.password!==values.rePassword){
  //       errors.rePassword='password not matched';
  //     }

  //   return errors;
  // } 
 let validationSchema= Yup.object({
    name:Yup.string().min(3,'minlenght is 3').max(15,'maxlenght is 15').required('name is required'),
    email:Yup.string().required('email is required').email('enter vaild email'),
    phone:Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'enter vaild phone'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/,'enter valid password'),
    rePassword:Yup.string().required('confirm password').oneOf([Yup.ref('password')],'not matched password'),
  })
  async function signUP(val){
    setLoading(true)
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
     console.log(err.response.data.message);
     setMSG(err.response.data.message);
     setLoading(false)
    });
     console.log(data);
      
    if(data.message=='success'){
      navigate('/signin')
      setLoading(false);
    }
  }
  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:'',
    },
    validationSchema:validationSchema,
    onSubmit:signUP,
  })
  return (
    <div className='my-5'>
      <h1 className='text-main text-center'>Register form</h1>
      <form action="" onSubmit={formik.handleSubmit}>
      <div className="row m-auto w-75 shadow gy-4 p-5">
        <div className="col-md-12">
          <label htmlFor="uName">Name : </label>
          <input type="text" onBlur={formik.handleBlur} name="name" value={formik.values.name} onChange={formik.handleChange} id="uName" className='form-control'/>
          {formik.errors.name&&formik.touched.name?<p className='text-danger'>{formik.errors.name}</p>:''}
        
        </div>
        <div className="col-md-12">
          <label htmlFor="uEmail">Email : </label>
          <input type="email" onBlur={formik.handleBlur} name="email" value={formik.values.email} id="uEmail" onChange={formik.handleChange}  className='form-control'/>
         {formik.errors.email&&formik.touched.email?<p className='text-danger'>{formik.errors.email}</p>:''}
        
        </div>
        <div className="col-md-12">
          <label htmlFor="uPhone">Phone : </label>
          <input type="tel" onBlur={formik.handleBlur} name="phone" id="uPhone" value={formik.values.phone} onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.phone&&formik.touched.phone?<p className='text-danger'>{formik.errors.phone}</p>:''}
        
        </div>
        <div className="col-md-12">
          <label htmlFor="uPassword">Password : </label>
          <input type="password" onBlur={formik.handleBlur} name="password" value={formik.values.password} onChange={formik.handleChange}  id="uPassword" className='form-control'/>
        
        {formik.errors.password&&formik.touched.password?<p className='text-danger'>{formik.errors.password}</p>:''}
        </div>
        <div className="col-md-12">
          <label htmlFor="uConfirm">RePassword : </label>
          <input type="password" onBlur={formik.handleBlur} name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange}  id="uConfirm" className='form-control'/>
          {formik.errors.rePassword&&formik.touched.rePassword?
          <p className='text-danger'>{formik.errors.rePassword}</p>:''}
        </div>
        {errMsg!==null?<p className='text-danger'>{errMsg}</p>:''}
        <div className="col-md-12 text-end my-2">
          <button type="submit" disabled={!(formik.dirty&&formik.isValid)} className='btn btn-success text-light'>Register
           {isLoading?<span>
           <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>:''}
          
          </button>
           
        </div>
        <p className='text-muted'>i have account <Link to='/signin' className='text-main fw-bold'>Login</Link></p>
      </div>
      </form>
       
    </div>
  )
}
