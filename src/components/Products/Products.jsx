import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {BallTriangle} from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Context/WishlistContext';
 
export default function Products() {
   let [catrgoryList,setCategory]=useState([]);
   async function getCategory(){
      let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
       setCategory(data.data);
    }
    useEffect(()=>{
      getCategory()
    },[]);
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };

  let{addCart,setCartNumber}= useContext(cartContext);
   let [productList,setProduct]=useState([]);
   async function getProduct(){
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log(data);
    setProduct(data.data);
   }
   useEffect(()=>{
      getProduct();
   },[])
  async function addToMyCart(id){
    let {data}=await addCart(id);
    console.log(data);
    if(data.status=='success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
   }
   // //////////////////////////////////////
  let {addToWishlist}= useContext(wishlistContext);

  async function addToMYWish(id){
      let {data}=await addToWishlist(id);
      console.log(data);
      if(data.status=='success'){
         toast.info(data.message);
         // setCartNumber(data.numOfCartItems)
       }
   }
   function changeWishlist(e,id){
      e.target.classList.replace('fa-regular','fa-solid');
    }
    //////////////////////////////
     let {getMyWishlist,deleteWishlist}= useContext(wishlistContext)
   let [wishListProduct,setWishListProduct]=useState();
  useEffect(()=>{
    (async ()=>{
      getProduct();
      let {data}=await getMyWishlist();
      setWishListProduct(data?.data);
    })()
     
  })
  function isInWishlist(id){
      let found=wishListProduct?.find((product)=>product._id===id);
      if (found){
         return true;
      }
      return false;
    }

   return <div className="row g-5">
       
      {productList.length>0?
      <>
      {productList.map((product)=>{
         return <div className="col-md-3" key={product._id}>

             <div className="product p-3 position-relative">
               {isInWishlist(product._id)==true?
               
               <button onClick={()=>{deleteWishlist(product._id)}} className={'btn border-danger'}>
               <i className='fa-solid fa-heart text-danger'></i></button>
               :
               <button onClick={()=>{addToMYWish(product._id)}} className={'btn border border-black'}>
               <i className='fa-solid fa-heart text-black'></i></button>
            
            }
             {/* <i onClick={()=>{addToMYWish(product._id)}} class="fa-regular fs-3 text-danger fa-heart position-absolute end-0 top-0 m-3"></i> */}
                <Link to={`/details/${product._id}`} className='link11'>
                 <img src={product.imageCover} alt={product.title} className='w-100'/>
                 <p className='text-main'>{product.category.name}</p>
                 <h6>{product.title}</h6>
                 <div className='d-flex justify-content-between'>
                  <p>{product.price} EGp</p>
                  <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></p>
                   
                 </div>
                </Link>
                <button onClick={()=>{addToMyCart(product._id)}} className='btn w-100 my-4 btn-success text-light mx-auto'>Add to cart</button>

             </div>

         </div>
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
}
