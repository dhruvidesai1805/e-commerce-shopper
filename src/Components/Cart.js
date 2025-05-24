import Header from './Header'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cartdetails from './Cartdetails'
const Cart = ({loadUser1}) => {
  const [users, setUsers] = useState([])
  const [total , setTotal] = useState([])

  console.log(total,"totla")
  const [price , setPrice] = useState('')
  const loadUser = (id) => {
    axios
      .get(`process.env.REACT_APP_API_URL/users/${id}`)
      .then((res) => {
        console.log(res,"responseee")
        console.log("res",res.data)
        const newArray = res?.data.filter((item) => {
          console.log('fdsf', item.cart)
          return item.cart.length > 0
        })

        console.log(newArray,"newArray")
        setUsers(newArray)
        let total1 = []
        newArray.map((item2) => {
          item2.cart.map((itm)=>{
            total1.push(Number(itm.quantity) * Number(item2.price))
          })
        })
        total1.length > 0 && setTotal(total1)
        setPrice(res.price);
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
    console.log('newarry', users)
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <>
      {/* Page Header Start */}
      <div className='container-fluid bg-secondary mb-5'>
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ minHeight: 300 }}
        >
          <h1 className='font-weight-semi-bold text-uppercase mb-3'>
            Shopping Cart
          </h1>
          <div className='d-inline-flex'>
            <p className='m-0'>
              <a href=''>Home</a>
            </p>
            <p className='m-0 px-2'>-</p>
            <p className='m-0'>Shopping Cart</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Cart Start */}
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-8 table-responsive mb-5'>
            <table className='table table-bordered text-center mb-0'>
              <thead className='bg-secondary text-dark'>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className='align-middle'>
                {console.log('fghgf', users)}
                {users.length > 0 &&
                  users?.map((item) =>
                    item.cart.map((item2) => {
                      return (
                        <Cartdetails
                          item={item}
                          item2={item2}
                          loadUser={loadUser}
                          loadUser1={loadUser1}
                        />
                      )
                    })
                  )}
              </tbody>
            </table>
          </div>
          <div className='col-lg-4'>
            <form className='mb-5' action=''>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control p-4'
                  placeholder='Coupon Code'
                />
                <div className='input-group-append'>
                  <button className='btn btn-primary'>Apply Coupon</button>
                </div>
              </div>
            </form>
            <div className='card border-secondary mb-5'>
              <div className='card-header bg-secondary border-0'>
                <h4 className='font-weight-semi-bold m-0'>Cart Summary</h4>
              </div>
              <div className='card-body'>
                <div className='d-flex justify-content-between mb-3 pt-1'>
                  <h6 className='font-weight-medium'>Subtotal</h6>
                  <h6 className='font-weight-medium'>{total}</h6>
                </div>
                <div className='d-flex justify-content-between'>
                  <h6 className='font-weight-medium'>Shipping</h6>
                  <h6 className='font-weight-medium'>$10</h6>
                </div>
              </div>
              <div className='card-footer border-secondary bg-transparent'>
                <div className='d-flex justify-content-between mt-2'>
                  <h5 className='font-weight-bold'>Total</h5>
                  <h5 className='font-weight-bold'>
                    { total.length > 0 && total.reduce(
                      (total, item) => total + item,
                      0
                    )}
                  </h5>
                </div>
                <button className='btn btn-block btn-primary my-3 py-3'>
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart End */}
      {/* Footer Start */}

      {/* Footer End */}
      {/* Back to Top */}
      <a href='#' className='btn btn-primary back-to-top'>
        <i className='fa fa-angle-double-up' />
      </a>
      {/* JavaScript Libraries */}
      {/* Contact Javascript File */}
      {/* Template Javascript */}
    </>
  )
}

export default Cart
