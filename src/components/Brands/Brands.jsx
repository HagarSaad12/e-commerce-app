import axios from 'axios';
import React, { useEffect } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
export default function Brands() {
 async function getBrands(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
 let {data,isLoading,isFetching}= useQuery('brands',getBrands);
//  console.log(data.data);
 useEffect(()=>{
  getBrands();
},[]);  
  return (
    <div className="container my-5">
      <h2 className='text-success text-center pb-3'>All Brands</h2>
       <div className='row g-3'>
       {!isLoading?
       <>
     {data?.data.data.map((brand)=>{
      return <>
        <div className="col-md-4 product">
         <Link className='link11' data-bs-toggle="modal" data-bs-target={`#${brand.name}`}>
                <img src={brand.image} alt={brand.name}/>
                <h3 className='text-center'>{brand.name}</h3>
         </Link> 
          
<div  className="modal fade" 
  id={brand.name} tabindex="-1" 
   aria-labelledby="exampleModalLabel" 
   aria-hidden="true">
  <div  className="modal-dialog">
    <div  className="modal-content">
      <div  className="modal-header">
        <button type="button"  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  className="modal-body d-flex justify-content-between align-items-center">
         <div>
         <h2  className='text-success'>{brand.name}</h2>
         <p>{brand.name}</p>
          </div>
        <img src={brand.image}/>
      </div>
      <div  className="modal-footer">
        <button type="button"  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
         </div> 
      </>
      
    
   })
   }
 
 
  </>:
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
