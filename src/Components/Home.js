import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

const Home = ({ wishlist }) => {
  const [users, setUsers] = useState([])
  const [counts, setCounts] = useState({})

  let navigate = useNavigate()

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    let counter = {}
    users.forEach(function (obj) {
      var key = obj.categories
      counter[key] = (counter[key] || 0) + 1
    })
    setCounts(counter)
  }, [users])

  const loadUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users?_page`)
      .then((res) => {
        setUsers(res?.data)
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }

  const uniqueCategories = new Set()

  const newusers = users.filter((element) => {
    const isDuplicate = uniqueCategories.has(element.categories)

    uniqueCategories.add(element.categories)

    if (!isDuplicate) {
      return true
    }
    return false
  })
  const categoriesAll = (value) => {
    console.log('value', value)
    navigate(`/${value}`)
  }

  const OnAddWishlist = (value) => {
    console.log('dfsgdfg', value)
    const Wishlist_data = { wishlist: true }

    if (value.wishlist) {
      toast.error('already added to your wishlist')
    } else {
      value.wishlist = true
      axios
        .put(`${process.env.REACT_APP_API_URL}/users/${value.id}`, value)
        .then((res) => {
          console.log('res', res)
          toast.success('item added to your wishlist')
          loadUsers()
          wishlist()
        })
        .catch((err) => {
          console.log('Error', err)
        })
    }
  }

  return (
    <>
      <ToastContainer />
      <div id='header-carousel' className='carousel slide' data-ride='carousel'>
        <div className='carousel-inner'>
          <div className='carousel-item active' style={{ height: 410 }}>
            <img className='img-fluid' src='img/carousel-1.jpg' alt='Image' />
            <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
              <div className='p-3' style={{ maxWidth: 700 }}>
                <h4 className='text-light text-uppercase font-weight-medium mb-3'>
                  10% Off Your First Order
                </h4>
                <h3 className='display-4 text-white font-weight-semi-bold mb-4'>
                  Fashionable Dress
                </h3>
                <a href='' className='btn btn-light py-2 px-3'>
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className='carousel-item' style={{ height: 410 }}>
            <img className='img-fluid' src='img/carousel-2.jpg' alt='Image' />
            <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
              <div className='p-3' style={{ maxWidth: 700 }}>
                <h4 className='text-light text-uppercase font-weight-medium mb-3'>
                  10% Off Your First Order
                </h4>
                <h3 className='display-4 text-white font-weight-semi-bold mb-4'>
                  Reasonable Price
                </h3>
                <a href='' className='btn btn-light py-2 px-3'>
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
        <a
          className='carousel-control-prev'
          href='#header-carousel'
          data-slide='prev'
        >
          <div className='btn btn-dark' style={{ width: 45, height: 45 }}>
            <span className='carousel-control-prev-icon mb-n2' />
          </div>
        </a>
        <a
          className='carousel-control-next'
          href='#header-carousel'
          data-slide='next'
        >
          <div className='btn btn-dark' style={{ width: 45, height: 45 }}>
            <span className='carousel-control-next-icon mb-n2' />
          </div>
        </a>
      </div>

      {/* Navbar End */}
      {/* Featured Start */}
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5 pb-3'>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center border mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fa fa-check text-primary m-0 mr-3' />
              <h5 className='font-weight-semi-bold m-0'>Quality Product</h5>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center border mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fa fa-shipping-fast text-primary m-0 mr-2' />
              <h5 className='font-weight-semi-bold m-0'>Free Shipping</h5>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center border mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fas fa-exchange-alt text-primary m-0 mr-3' />
              <h5 className='font-weight-semi-bold m-0'>14-Day Return</h5>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center border mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fa fa-phone-volume text-primary m-0 mr-3' />
              <h5 className='font-weight-semi-bold m-0'>24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>
      {/* Featured End */}
      {/* Categories Start */}

      <div className='container-fluid pt-5'>
        <div className='row px-xl-5 pb-3'>
          {newusers?.map((item) => {
            console.log("all_data",newusers)
            return (
              <div
                className='col-lg-4 col-md-6 pb-1'
                onClick={(e) => categoriesAll(item.categories)}
              >
                <div
                  className='cat-item d-flex flex-column border mb-4 h-100'
                  style={{ padding: 30 }}
                >
                  <p className='text-right'>
                    {counts[item.categories]} Products
                  </p>
                  <NavLink
                    to=''
                    className='cat-img position-relative overflow-hidden mb-3'
                  >
                    <img className='img-fluid' src={item.image} alt='' />
                  </NavLink>
                  <h5 className='font-weight-semi-bold m-0'>
                    {item.categories}
                  </h5>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Categories End */}
      {/* Offer Start */}
      <div className='container-fluid offer pt-5'>
        <div className='row px-xl-5'>
          <div className='col-md-6 pb-4'>
            <div className='position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5'>
              <img src='img/offer-1.png' alt='' />
              <div className='position-relative' style={{ zIndex: 1 }}>
                <h5 className='text-uppercase text-primary mb-3'>
                  20% off the all order
                </h5>
                <h1 className='mb-4 font-weight-semi-bold'>
                  Spring Collection
                </h1>
                <a href='' className='btn btn-outline-primary py-md-2 px-md-3'>
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className='col-md-6 pb-4'>
            <div className='position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5'>
              <img src='img/offer-2.png' alt='' />
              <div className='position-relative' style={{ zIndex: 1 }}>
                <h5 className='text-uppercase text-primary mb-3'>
                  20% off the all order
                </h5>
                <h1 className='mb-4 font-weight-semi-bold'>
                  Winter Collection
                </h1>
                <a href='' className='btn btn-outline-primary py-md-2 px-md-3'>
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Offer End */}
      {/* Products Start */}
      <div className='container-fluid pt-5'>
        <div className='text-center mb-4'>
          <h2 className='section-title px-5'>
            <span className='px-2'>Trandy Products</span>
          </h2>
        </div>
        <div className='row px-xl-5 pb-3'>
          {users?.map((item) => {
            return (
              item.featureproduct === 'Yes' && (
                <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
                  <div className='card product-item border-0 mb-4'>
                    <div className='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>
                      <img
                        className='img-fluid h-100 w-100'
                        src={item.image}
                        alt=''
                      />
                    </div>
                    <div className='card-body border-left border-right text-center p-0 pt-4 pb-3'>
                      <h6 className='text-truncate mb-3'>{item.productname}</h6>
                      <div className='d-flex justify-content-center'>
                        <h6>{item.price}</h6>
                        <h6 className='text-muted ml-2'>
                          <del>{item.price}</del>
                        </h6>
                      </div>
                    </div>
                    <div className='card-footer d-flex justify-content-between bg-light border'>
                      <Link
                        to={`/Details/${item.id}`}
                        className='btn btn-sm text-dark p-0'
                      >
                        <i className='fas fa-eye text-primary mr-1' />
                        View Detail
                      </Link>
                      <div
                        className='btn btn-sm text-dark p-0'
                        onClick={() => OnAddWishlist(item)}
                      >
                        <i className='fas fa-heart text-primary' />
                      </div>
                      <a href='' className='btn btn-sm text-dark p-0'>
                        <i className='fas fa-shopping-cart text-primary mr-1' />
                        Add To Cart
                      </a>
                    </div>
                    
                  </div>
                </div>
              )
            )
          })}
        </div>
      </div>
      {/* Products End */}
      {/* Subscribe Start */}
      <div className='container-fluid bg-secondary my-5'>
        <div className='row justify-content-md-center py-5 px-xl-5'>
          <div className='col-md-6 col-12 py-5'>
            <div className='text-center mb-2 pb-2'>
              <h2 className='section-title px-5 mb-3'>
                <span className='bg-secondary px-2'>Stay Updated</span>
              </h2>
              <p>
                Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet
                diam labore at justo ipsum eirmod duo labore labore.
              </p>
            </div>
            <form action=''>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control border-white p-4'
                  placeholder='Email Goes Here'
                />
                <div className='input-group-append'>
                  <button className='btn btn-primary px-4'>Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <a href='#' className='btn btn-primary back-to-top'>
        <i className='fa fa-angle-double-up' />
      </a>
    </>
  )
}

export default Home
