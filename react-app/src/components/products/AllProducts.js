import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../store/products'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import "./AllProducts.css" 


// images
import food from '../../assets/catFood.jpg'
import medi from '../../assets/med1.jpg'
import toy from '../../assets/catToy.jpg'
import litter from '../../assets/litter.webp'
import feeder from "../../assets/feeder.jpg"
import grooming from "../../assets/grooming.jpg"
import Footer from '../Footer'

const AllProducts = () => {
  const history = useHistory()
    const dispatch = useDispatch()

  
    const handleFuture=()=>{
      history.push('/future')
    }
  

    const products = useSelector((state)=>state.products)

    const productList = Object.values(products)
 

    const store = useSelector((state)=>state.shop)

  useEffect(()=>{
    dispatch(getAllProducts())

  },[dispatch])

  return (
    <>
    <div className='categray-container'>
    <h2>Explore one-of-a-kind finds from independent makers</h2>
    </div>

    <div className='categary-img-container'>
        
        <div className='search-img-and-text' onClick={handleFuture}>
        <img src={food} alt="cat-food-img"/>
        <p>Food</p>
        </div>
      
        <div className='search-img-and-text' onClick={handleFuture}>
        <img src={toy} alt="cat-toy-img"/>
        <p>Toy</p>
        </div>
      
        <div className='search-img-and-text' onClick={handleFuture}>
        <img src={medi} alt="cat-medicine-img"/>
        <p>Health</p>
        </div>
      
        <div className='search-img-and-text' onClick={handleFuture}>
        <img src={litter} alt="cat-litter-img"/>
        <p>Litter &<br/> Litter Boxes</p>
        </div>

        <div className='search-img-and-text' onClick={handleFuture}>
        <img src={feeder} alt="cat-feeder-img"/>
        <p>Bowls &<br/> Feeders</p>
        </div>

        <div className='search-img-and-text'onClick={handleFuture}>
        <img src={grooming} alt="cat-grooming-img"/>
        <p>Grooming <br/> Supplies</p>
        </div>`
    </div>

    <div className='home-container'>

      <div className='products'>
        
        {productList && productList.map((product)=>{
            return(
              <>
              <Link key={product.id} className='Link' to = {`/products/${product.id}`}>
            <div className='product' >
              

                <img src={product.img} alt="product" 
                  onError={e=>{e.currentTarget.src ='https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg'}}
                />
              
              
                {/* <h3>{product.name}</h3> */}
                <span className='price-span'>${product.price.toFixed(2)}</span>
              
            </div>
            
            </Link>
            </>
            )})}
            </div>
    </div>
    <Footer />
    </>
  )
}

export default AllProducts
