 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
 
export default function Category() {
  let [data,setCategory]=useState([]);
 async function getCategory(){
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
     setCategory(data.data);
    console.log(data.data);
  }
   
  async function getAllsubcategories(id){
        let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`)
        console.log(data);
        setCategory(data.data);
      }
      useEffect(()=>{
        getCategory();
        // getAllsubcategories()
      },[]);
       
       
  return (
     
    <div>
        <div className="row g-5 h-100">
       
       {data.length>0?
       <>
       {data.map((product)=>{
          return  <>
          <div className="col-md-4" key={product._id}>
                
              <div className="p-2 h-100 text-center product"> 
              <Link  className='link11' to={`/subCategories/${product._id}`}>       
                   <img src={product.image} alt={product.title} className='w-100 h-75'/>
                   <h2 className='mt-3 text-center text-success'>{product.name}</h2>
              </Link> 
              </div>
               
          </div>
          
          
          </>

        })}</>:
        <div className='vh-100 d-flex justify-content-center align-items-center'>
           <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          /> 
        </div>
              
        }
    </div>
    </div>
  )
}
