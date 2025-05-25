import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Details = ({loadUser1}) => {
  const [users, setUsers] = useState([])
  const [allProduct, setAllProduct] = useState([])
  const [sizes, setSize] = useState('')
  const [colors, setColor] = useState('')
  const [counts, setCount] = useState(1)
  const { id } = useParams()
  console.log('id', id)
  console.log('users',users ,sizes,colors)
  const loadUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((res) => {
        setUsers(res?.data)
        
        axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res1) => {
          const result = res1.data.filter((item) => {
            console.log('item', item.categories)

            return item.categories === res.data?.categories
          })
          console.log('item1', res.data?.categories)
          setAllProduct(result)
          console.log('fdgfdg', result)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onChangeSizeValue(e) {
    setSize(e.target.value)
  }
  function onChangeColorValue(e) {
    setColor(e.target.value)
  }

  const OnSubmitCart = (value) => {
    console.log('sdf', value)
    const CartData = [
      {
        size: sizes,
        color: colors,
        quantity: counts,
      },
    ]
    console.log('console_color', colors, sizes, counts)
    console.log('sdf', value.cart)
    if (sizes.length === 0 || colors.length === 0) {
      if (sizes.length === 0) {
        console.log('gjdghjh', sizes.length)
        toast.error('select size')
      }
      if (colors.length === 0) {
        toast.error('select color')
      }
    } else {
      if (value.cart && Object.keys(value.cart).length > 0) {
        const checkcart = users.cart.filter((item) => {

          return item.size === sizes && item.color === colors
        })


        console.log('check', checkcart[0])
        if (checkcart.length < 0) {
          toast.error('already added to cart')
        } else {
          // console.log('check', checkcart)
          //
          value.cart.push({
            size: sizes,
            color: colors,
            quantity: counts,
          })

          axios
            .put(`${process.env.REACT_APP_API_URL}/users/${id}`, value)
            .then((res) => {
              console.log(res,"console_ress")
              toast.success('added to cart')
              loadUser1()
              setColor()
              setSize()
              setCount(1)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      } else {
        value.cart = CartData
        axios
          .put(`${process.env.REACT_APP_API_URL}/users/${id}`, value)
          .then((res) => {
            console.log(res)
            toast.success('added to cart')
            loadUser1()
            setColor()
            setSize()
            setCount(1)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  const uniqueCategories = new Set()

  const newusers = allProduct.filter((element) => {
    const isDuplicate = uniqueCategories.has(element.categories)

    uniqueCategories.add(element.categories)

    if (!isDuplicate) {
      return true
    }
    return false
  })

  const onChangeCountMinus = () => {
    if (counts > 1) {
      setCount(counts - 1)
    } else {
      setCount(1)
      toast.error('Minimum Only 1 Quantity')
    }
  }
  const onChangeCountPlus = () => {
    console.log('dfsdf', users.quantity)

    if (counts < users.quantity) {
      setCount(counts + 1)
    } else {
      setCount(users.quantity)
      toast.error('Out of Stock')
    }
  }
  useEffect(() => {
    loadUser()
  }, [id])

  return (
    <>
      <ToastContainer />
      {/* Page Header Start */}
      <div className='container-fluid bg-secondary mb-5'>
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ minHeight: 300 }}
        >
          <h1 className='font-weight-semi-bold text-uppercase mb-3'>
            Shop Detail
          </h1>
          <div className='d-inline-flex'>
            <p className='m-0'>
              <a href=''>Home</a>
            </p>
            <p className='m-0 px-2'>-</p>
            <p className='m-0'>Shop Detail</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Shop Detail Start */}
      <div className='container-fluid py-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-5 pb-5'>
            <div
              id='product-carousel'
              className='carousel slide'
              data-ride='carousel'
            >
              <div className='carousel-inner border'>
                <div className='carousel-item active'>
                  <img
                    className='w-100 h-100'
                    src={`/${users.image}`}
                    alt='Image'
                  />
                </div>
                <div className='carousel-item'>
                  <img
                    className='w-100 h-100'
                    src={`/${users.image}`}
                    alt='Image'
                  />
                  {console.log('img', users.image)}
                </div>
                <div className='carousel-item'>
                  <img
                    className='w-100 h-100'
                    src={`/${users.image}`}
                    alt='Image'
                  />
                </div>
                <div className='carousel-item'>
                  <img
                    className='w-100 h-100'
                    src={`/${users.image}`}
                    alt='Image'
                  />
                </div>
              </div>
              <a
                className='carousel-control-prev'
                href='#product-carousel'
                data-slide='prev'
              >
                <i className='fa fa-2x fa-angle-left text-dark' />
              </a>
              <a
                className='carousel-control-next'
                href='#product-carousel'
                data-slide='next'
              >
                <i className='fa fa-2x fa-angle-right text-dark' />
              </a>
            </div>
          </div>
          <div className='col-lg-7 pb-5'>
            <h3 className='font-weight-semi-bold'>{users.productname}</h3>
            <div className='d-flex mb-3'>
              <div className='text-primary mr-2'>{users.categories}</div>
            </div>
            <h3 className='font-weight-semi-bold mb-4'>{users.price}</h3>
            <p className='mb-4'>{users.description}</p>
            <div className='d-flex mb-3'>
              <p className='text-dark font-weight-medium mb-0 mr-3'>Sizes:</p>
              <form>
                {users.size !== undefined &&
                  users.size.map((item, index) => {
                    return (
                      <div className='custom-control custom-radio custom-control-inline'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id={`size-${index + 1}`}
                          name='size'
                          value={item}
                          onChange={(e) => onChangeSizeValue(e)}
                          checked={sizes === item}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor={`size-${index + 1}`}
                        >
                          {item}
                        </label>
                      </div>
                    )
                  })}
                {console.log('size', users.size)}
              </form>
            </div>
            <div className='d-flex mb-4'>
              <p className='text-dark font-weight-medium mb-0 mr-3'>Colors:</p>
              <form>
                {users.color !== undefined &&
                  users.color.map((item, index) => {
                    return (
                      <div className='custom-control custom-radio custom-control-inline'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id={`color-${index + 1}`}
                          name='color'
                          value={item}
                          checked={colors === item}
                          onChange={(e) => onChangeColorValue(e)}
                        />
                        <label
                          className='custom-control-label'
                          htmlFor={`color-${index + 1}`}
                        >
                          {item}
                        </label>
                      </div>
                    )
                  })}
              </form>
            </div>
            <div className='d-flex align-items-center mb-4 pt-2'>
              <div className='input-group quantity mr-3' style={{ width: 130 }}>
                <div className='input-group-btn'>
                  <button
                    className='btn btn-primary btn-minus'
                    onClick={(e) => onChangeCountMinus(e)}
                  >
                    <i className='fa fa-minus' />
                  </button>
                </div>
                <input
                  type='text'
                  className='form-control bg-secondary text-center'
                  value={counts}
                />
                <div className='input-group-btn'>
                  <button
                    className='btn btn-primary btn-plus'
                    onClick={(e) => onChangeCountPlus(e)}
                  >
                    <i className='fa fa-plus' />
                  </button>
                </div>
              </div>
              <button
                className='btn btn-primary px-3'
                onClick={() => OnSubmitCart(users)}
              >
                <i className='fa fa-shopping-cart mr-1' /> Add To Cart
              </button>
            </div>
            <div className='d-flex pt-2'>
              <p className='text-dark font-weight-medium mb-0 mr-2'>
                Share on:
              </p>
              <div className='d-inline-flex'>
                <a className='text-dark px-2' href=''>
                  <i className='fab fa-facebook-f' />
                </a>
                <a className='text-dark px-2' href=''>
                  <i className='fab fa-twitter' />
                </a>
                <a className='text-dark px-2' href=''>
                  <i className='fab fa-linkedin-in' />
                </a>
                <a className='text-dark px-2' href=''>
                  <i className='fab fa-pinterest' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Shop Detail End */}
      <>
        {/* Products Start */}
        <div className='container-fluid py-5'>
          <div className='text-center mb-3'>
            <h2 className='section-title px-5'>
              {allProduct.length > 1 ? <span className='px-2'>You May Also Like</span> :<span></span> }
            </h2>
          </div>
          {/* <div className='row'>
                  <div className='col-12 col-md-4'> */}
                  <div className='d-md-flex d-sm-block'>
          {allProduct.map(
            (item) =>
              item.id !== users.id && (
              
                    <div className='owl-carousel related-carousel m-5'>
                      <div className='card product-item border-0'>
                        <div className='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>
                          <img
                            className='img-fluid w-10'
                            src={`/${item.image}`}
                            alt=''
                          />
                        </div>
                        <div className='card-body border-left border-right text-center p-0 pt-4 pb-3'>
                          <h6 className='text-truncate mb-3'>
                            {item.productname}
                          </h6>
                          <div className='d-flex justify-content-center'>
                            <h6>{item.size.join(',')}</h6>
                            <h6 className='text-muted ml-2'>
                              <h6>{item.categories}</h6>
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
                          <a href='' className='btn btn-sm text-dark p-0'>
                            <i className='fas fa-shopping-cart text-primary mr-1' />
                            Add To Cart
                          </a>
                        </div>
                      </div>
                    </div>
                 
              )
              )}
              </div>
              </div>
               {/* </div> */}
        {/* Products End */}
      </>
    </>
  )
}

export default Details
// https://www.querythreads.com/how-to-implement-multiple-checkbox-using-react-hook/
