import './App.css'
import React, { useEffect, useState } from 'react'
import Home from './Components/Home'
import Shop from './Components/Shop'
import Details from './Components/Details'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Cart from './Components/Cart'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Header from './Components/Header'
import Wishlist from './Components/Wishlist'

function App() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState([])
  const [wishlistcount, setWishlistCount] = useState([])

  const loadUser1 = () => {
    axios
      .get(`process.env.REACT_APP_API_URL/users`)
      .then((res) => {
        setUsers(res?.data)
        const newArray = res?.data.filter((item) => {
          console.log('fdsf', item.cart)
          return item.cart.length > 0
        })
        setUsers(newArray)
        let total1 = []
        newArray.map((item2) => {
          item2.cart.map((itm) => {
            total1.push(Number(itm.quantity) * Number(item2.price))
          })
        })
        setTotal(total1)
        console.log('newarry111', total1)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
    useEffect(() => {
      loadUser1()
      wishlist()
    }, [])
    
    const uniqueCategories = new Set()
    
    const newusers = users.filter((element) => {
      const isDuplicate = uniqueCategories.has(element.categories)

    uniqueCategories.add(element.categories)

    if (!isDuplicate) {
      return true
    }
    return false
  })
  
  const wishlist = () => {
    axios
    .get(`process.env.REACT_APP_API_URL/users`)
    .then((res) => {
      setUsers(res?.data)
      const newArray = res?.data.filter((item) => {
        return item.wishlist
      })
      console.log('console1', newArray)
      // setUsers(newArray)
      setWishlistCount(newArray)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  console.log('total', total)
  return (
    <>
      <BrowserRouter>
        <Header
          newusers={newusers}
          total={total}
          wishlistcount={wishlistcount}
          />
          {console.log('newarry111____', total)}
        <Routes>
          <Route path='/' element={<Home wishlist={wishlist} />} />
          <Route path='/Shop' element={<Shop wishlist={wishlist} headername={"OUR SHOP"} />} />
          <Route path='/:categories' element={<Shop  headername={"Categorie Product"}/>} />
          <Route
            path='/Details/:id'
            element={<Details loadUser1={loadUser1} />}
            />
          <Route path='/Cart' element={<Cart loadUser1={loadUser1} />} />
          <Route path='/Wishlist' element={<Wishlist wishlist={wishlist} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
