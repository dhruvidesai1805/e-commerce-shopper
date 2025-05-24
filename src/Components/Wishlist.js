import Header from './Header'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'


const Wishlist = ({wishlist}) => {
  const [users, setUsers] = useState([])

  const loadUser = () => {
    axios
      .get(`http://localhost:3002/users`)
      .then((res) => {
        setUsers(res?.data)
        const newArray = res?.data.filter((item) => {
          console.log('dfgfgh', item.wishlist)
          return item.wishlist
        })
        console.log('new', newArray.length)
        setUsers(newArray)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadUser()
  }, [])

  const deleteUser = (value) => {
    console.log('delete', value)
    value.wishlist = false
    axios
      .put(`http://localhost:3002/users/${value.id}`, value)
      .then((res) => {
        console.log('res', res)
        toast.error('your wishlist is deleted')
        loadUser()
        wishlist()
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }
  return (
    <>
      {/* Page Header Start */}
      <ToastContainer/>
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
          <div className='col-lg-12 table-responsive mb-5'>
            <table className='table table-bordered text-center mb-0'>
              <thead className='bg-secondary text-dark'>
                <tr>
                  <th>Image</th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Remove</th>
                </tr>
              </thead>
              {users.map((item) => (
                <tr>
                  <td className='align-middle'>
                    <img src={`/${item.image}`} alt='' style={{ width: 50 }} />
                  </td>
                  <td className='align-middle'>{item.productname}</td>
                  <td className='align-middle'> ${item.price}</td>
                  <td className='align-middle'>{item.size.join(',')}</td>
                  <td className='align-middle'>{item.color.join(',')}</td>
                  <td className='align-middle'>
                    <buttons
                      className='btn btn-sm btn-primary'
                      onClick={() => deleteUser(item)}
                    >
                      <i className='fa fa-times' />
                    </buttons>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <a href='#' className='btn btn-primary back-to-top'>
        <i className='fa fa-angle-double-up' />
      </a>
    </>
  )
}

export default Wishlist
