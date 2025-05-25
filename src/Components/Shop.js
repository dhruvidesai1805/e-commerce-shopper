import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import axios from 'axios'
const Shop = ({ wishlist, headername  }) => {
  const [users, setUsers] = useState([])
  const [counts, setCounts] = useState({})
  // const [search, setSearch] = useState([])
  const [checked, setChecked] = useState(['categories-all'])
  const [checkedcolor, setCheckedColor] = useState(['color-all'])
  const [checkedsize, setCheckedSize] = useState(['size-all'])
  const [allProduct, setAllProduct] = useState([])
  const [CategoriesSortby, setCategoriesSortby] = useState(false)
  const [productnamesearch, setProductNameSearch] = useState()
  const [datasort, setDataSort] = useState([]);
  const { categories } = useParams()

  const DropdownChange = () => {
    setCategoriesSortby(!CategoriesSortby)
  }
  const onInputSearchProductName = (e) => {
    setProductNameSearch(e.target.value)
    console.log('search', e.target.value)
    const name = allProduct.filter((item) => {
      console.log('allproduct', allProduct)
      console.log('item', item.productname)
      return item.productname.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setUsers(name)
    console.log('searchname', name)
  }

  useEffect(() => {
    loadUsers()
    if (categories === undefined) {
      setChecked(['categories-all'])
    } else {
      setChecked([categories])
    }
  }, [categories])

  useEffect(() => {
    let counter = {}

    allProduct.forEach(function (obj) {
      var key = obj.categories
      counter[key] = (counter[key] || 0) + 1
    })
    setCounts(counter)
  }, [allProduct])

  const loadUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users?_page`)
      .then((res) => {
        setAllProduct(res.data)
        if (categories === undefined) {
          setUsers(res?.data)
        } else {
          const results = res.data.filter((item) => {
            return item.categories === categories
          })
          setUsers(results)
        }
      })

      .catch((err) => {
        console.log('Error', err)
      })
  }

  const OnShopAddWishlist = (value) => {
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

  // console.log('all', allProduct)
  const uniqueCategories = new Set()

  const newusers = allProduct.filter((element) => {
    const isDuplicate = uniqueCategories.has(element.categories)

    uniqueCategories.add(element.categories)

    if (!isDuplicate) {
      return true
    }
    return false
  })

  const newcolor = []
  allProduct.filter((item) => {
    console.log('color', item.color)
    newcolor.push(item.color)
  })

  let newarraycolor = []
  if (newcolor.length > 0) {
    newcolor?.map((item) => {
      console.log('dfgfdg', item)
      item?.map((item1) => {
        if (!newarraycolor.includes(item1)) {
          newarraycolor.push(item1)
          console.log('21231', item1)
        }
      })
    })
  }

  const onChangevalueColor = (event) => {
    let updatedListColor = [...checkedcolor]
    if (event.target.checked) {
      if (event.target.value === 'color-all') {
        updatedListColor = ['color-all']
        setUsers(allProduct)
      } else {
        updatedListColor = [...checkedcolor, event.target.value]
        // updatedList.splice(checked.indexOf(event.target.value), 1);
        if (updatedListColor.includes('color-all')) {
          var index = updatedListColor.indexOf('color-all')
          updatedListColor.splice(index, 1)
          console.log('first', updatedListColor)
        }
      }
    } else {
      updatedListColor.splice(checkedcolor.indexOf(event.target.value), 1)
      if (updatedListColor.length === 0) {
        updatedListColor = ['color-all']
      }
    }
    setCheckedColor(updatedListColor)
    getFilteredListColor(updatedListColor)
  }

  const getFilteredListColor = (value) => {
    if (value[0] === 'color-all') {
      setUsers(allProduct)
    } else {
      const filter = []
      allProduct.map((item) => {
        item.color.map((item1) => {
          console.log('valfdg', item1)
          if (value.includes(item1)) {
            filter.push(item)
          }
        })
      })
      setUsers(filter)

      console.log('val', filter)
    }
  }

  const newsize = []
  allProduct.filter((item) => {
    newsize.push(item.size)
  })

  const newarraysize = []
  if (newsize.length > 0) {
    newsize?.map((item) => {
      item.map((item1) => {
        if (!newarraysize.includes(item1)) {
          newarraysize.push(item1)
        }
      })
    })
  }

  const onChangevalueSize = (event) => {
    let updatedListSize = [...checkedsize]
    if (event.target.checked) {
      if (event.target.value === 'size-all') {
        updatedListSize = ['size-all']
        setUsers(allProduct)
      } else {
        updatedListSize = [...checkedsize, event.target.value]
        // updatedList.splice(checked.indexOf(event.target.value), 1);
        if (updatedListSize.includes('size-all')) {
          var index = updatedListSize.indexOf('size-all')
          updatedListSize.splice(index, 1)
          console.log('first', updatedListSize)
        }
      }
    } else {
      updatedListSize.splice(checkedsize.indexOf(event.target.value), 1)
      if (updatedListSize.length === 0) {
        updatedListSize = ['size-all']
      }
    }
    setCheckedSize(updatedListSize)
    getFilteredListSize(updatedListSize)
  }

  const getFilteredListSize = (value) => {
    if (value[0] === 'size-all') {
      setUsers(allProduct)
    } else {
      const filter = []
      allProduct.map((item) => {
        item.size.map((item1) => {
          console.log('valfdg', item1)
          if (value.includes(item1)) {
            filter.push(item)
          }
        })
      })
      setUsers(filter)

      console.log('val', filter)
    }
  }

  const onchangevalue = (event) => {
    let updatedList = [...checked]
    if (event.target.checked) {
      if (event.target.value === 'categories-all') {
        updatedList = ['categories-all']
        setUsers(allProduct)
      } else {
        updatedList = [...checked, event.target.value]
        // updatedList.splice(checked.indexOf(event.target.value), 1);
        if (updatedList.includes('categories-all')) {
          var index = updatedList.indexOf('categories-all')
          updatedList.splice(index, 1)
          console.log('first', updatedList)
        }
      }
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1)
      if (updatedList.length === 0) {
        updatedList = ['categories-all']
      }
    }
    setChecked(updatedList)
    getFilteredList(updatedList)
  }

  const getFilteredList = (value) => {
    if (value[0] === 'categories-all') {
      setUsers(allProduct)
    } else {
      const filter = allProduct.filter((item) =>
        value.includes(item.categories)
      )
      setUsers(filter)

      console.log('val', allProduct)
    }
  }

  const sortArray = (type) => {
   
    const sortProperty = type[type];
    console.log("dsfdf",type)
    const sorted = allProduct.sort((a, b) => b[sortProperty] - a[sortProperty]);
    
    console.log(sorted);
    setDataSort(sorted);
  };

  return (
    <>
      {/* Page Header Start */}
      <ToastContainer />
      <div className='container-fluid bg-secondary mb-5'>
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ minHeight: 300 }}
        >
          <h1 className='font-weight-semi-bold text-uppercase mb-3'>
           {headername}
          </h1>
          <div className='d-inline-flex'>
            <p className='m-0'>
              <Link to='/'>Home</Link>
            </p>
            <p className='m-0 px-2'>-</p>
            <p className='m-0'>Shop</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Shop Start */}
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          {/* Shop Sidebar Start */}
          <div className='col-lg-3 col-md-12'>
            {/* Color Start */}
            <div className='border-bottom mb-4 pb-4'>
              <h5 className='font-weight-semi-bold mb-4'>Filter by color</h5>
              <form>
                <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    value={'color-all'}
                    id='color-all'
                    checked={checkedcolor.includes('color-all')}
                    onChange={onChangevalueColor}
                  />
                  <label className='custom-control-label' htmlFor='color-all'>
                    All color
                  </label>
                  <span className='badge border font-weight-normal'>
                    {users.length}
                  </span>
                </div>
                {console.log('sdfdf', newusers)}
                {newarraycolor?.map((item, index) => {
                  return (
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id={`color-${index + 1}`}
                        value={item}
                        checked={checkedcolor.includes(item)}
                        onChange={onChangevalueColor}
                      />
                      <label
                        className='custom-control-label'
                        htmlFor={`color-${index + 1}`}
                      >
                        {item}
                      </label>
                      <span className='badge border font-weight-normal'>
                        {counts[item]}
                      </span>
                    </div>
                  )
                })}
              </form>
            </div>
            {/* Color End */}
            {/* Size Start */}
            <div className='mb-5'>
              <h5 className='font-weight-semi-bold mb-4'>Filter by size</h5>
              <form>
                <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    value={'size-all'}
                    id='size-all'
                    checked={checkedsize.includes('size-all')}
                    onChange={onChangevalueSize}
                  />
                  <label className='custom-control-label' htmlFor='size-all'>
                    All size
                  </label>
                  <span className='badge border font-weight-normal'>
                    {users.length}
                  </span>
                </div>

                {newarraysize?.map((item, index) => {
                  return (
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        value={item}
                        id={`size-${index + 1}`}
                        checked={checkedsize.includes(item)}
                        onChange={onChangevalueSize}
                      />
                      <label
                        className='custom-control-label'
                        htmlFor={`size-${index + 1}`}
                      >
                        {item}
                      </label>
                      <span className='badge border font-weight-normal'>
                        {counts[item]}
                      </span>
                    </div>
                  )
                })}
              </form>
            </div>
            {/* Size End */}
            {/* All Categories */}
            <div className='mb-5'>
              <h5 className='font-weight-semi-bold mb-4'>
                Filter by Categorie
              </h5>
              <form>
                <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    value={'categories-all'}
                    id='categories-all'
                    checked={checked.includes('categories-all')}
                    onChange={onchangevalue}
                  />
                  <label
                    className='custom-control-label'
                    htmlFor='categories-all'
                  >
                    All categories
                  </label>
                  <span className='badge border font-weight-normal'>
                    {users.length}
                  </span>
                </div>

                {newusers?.map((item, index) => {
                  return (
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id={`categories-${index + 1}`}
                        value={item.categories}
                        checked={checked.includes(item.categories)}
                        onChange={onchangevalue}
                      />
                      <label
                        className='custom-control-label'
                        htmlFor={`categories-${index + 1}`}
                      >
                        {item.categories}
                      </label>
                      <span className='badge border font-weight-normal'>
                        {counts[item.categories]}
                      </span>
                    </div>
                  )
                })}
              </form>
            </div>
          </div>
          {/* All Categories End */}
          {/* Shop Product Start */}
          <div className='col-lg-9 col-md-12'>
            <div className='row pb-3'>
              <div className='col-12 pb-1'>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                  <form action=''>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search by name'
                        value={productnamesearch}
                        onChange={(e) => onInputSearchProductName(e)}
                      />
                      <div className='input-group-append'>
                        <span className='input-group-text bg-transparent text-primary'>
                          <i className='fa fa-search' />
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className='col-lg-3 d-none d-lg-block'>
                    <a
                      className='btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100'
                      data-toggle='collapse'
                      onClick={() => DropdownChange()}
                    >
                      <h6 className='m-0'>Sort by</h6>
                      <i className='fa fa-angle-down text-dark' />
                    </a>
                    <nav
                      className='collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0'
                      id='navbar-vertical'
                    >
                      {CategoriesSortby && (
                        <div className='navbar-nav w-100 overflow-hidden'>
                          <a class='dropdown-item' onClick={(e) => sortArray(e.target.value)}>
                            A to Z
                          </a>
                          <a class='dropdown-item' href='#'>
                            Popularity
                          </a>
                          <a class='dropdown-item' href='#'>
                            Best Rating
                          </a>
                        </div>
                      )}
                    </nav>
                  </div>
                </div>
              </div>

              {users?.map((item) => {
                return (
                  <div className='col-lg-4 col-md-6 col-sm-12 pb-1'>
                    <div className='card product-item border-0 mb-4'>
                      <div className='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>
                        <img
                          className='img-fluid h-100 w-100'
                          src={item.image}
                          alt=''
                        />
                      </div>
                      <div className='card-body border-left border-right text-center p-0 pt-4 pb-3'>
                        <h6 className='text-truncate mb-3'>
                          {item.productname}
                        </h6>
                        <div className='d-flex justify-content-center'>
                          <h6>{item.price}</h6>
                          <div className='text-muted ml-2'>
                            <h6>{item.categories}</h6>
                          </div>
                        </div>
                        <div className='text-muted ml-2'>
                          <p>{item.color.join(',')}</p>
                        </div>
                        <div className='text-muted ml-2'>
                          <p>{item.size.join(',')}</p>
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
                          onClick={() => OnShopAddWishlist(item)}
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
              })}

              <div className='col-12 pb-1'>
                <nav aria-label='Page navigation'>
                  <ul className='pagination justify-content-center mb-3'>
                    <li className='page-item disabled'>
                      <a className='page-link' href='#' aria-label='Previous'>
                        <span aria-hidden='true'>«</span>
                        <span className='sr-only'>Previous</span>
                      </a>
                    </li>
                    <li className='page-item active'>
                      <a className='page-link' href='#'>
                        1
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        2
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        3
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#' aria-label='Next'>
                        <span aria-hidden='true'>»</span>
                        <span className='sr-only'>Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}
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

export default Shop
