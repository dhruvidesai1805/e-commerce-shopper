import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const Cartdetails = ({ item, item2, loadUser ,loadUser1}) => {
   const [users, setUsers] = useState([])
  const [counts, setCount] = useState(item2.quantity)

  const onChangeCount = (abc) => {
    let qty
    if (abc === 'plus') {
      setCount(counts + 1)
      qty = counts + 1
      if (counts >= item.quantity) {
        setCount(item.quantity)
        qty = Number(item.quantity)
        toast.error('out of stock')
      }
    } else if (counts > 1) {
      setCount(counts - 1)
      qty = counts - 1
    }

    item2.quantity = qty
    axios
      .put(`process.env.REACT_APP_API_URL/users/${item.id}`, item)
      .then((res) => {
        loadUser()
        
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteUser = (value, value2) => {
    console.log('dsfgfd', value, value2)
    const del_data = value.cart.filter((item) => {
      return item !== value2
    })
    console.log('dfdsf', del_data)
    value.cart = del_data
    axios
      .put(`process.env.REACT_APP_API_URL/users/${value.id}`, value)
      .then((res) => {
        loadUser1()
        loadUser()
        console.log("value",res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <ToastContainer />
      <tr>
        <td className='align-middle'>
          <img src={`/${item.image}`} alt='' style={{ width: 50 }} />
          {item.productname}
        </td>
        <td className='align-middle'> ${item.price}</td>
        <td className='align-middle'>
          <div className='input-group quantity mx-auto' style={{ width: 100 }}>
            <div className='input-group-btn'>
              <button
                className='btn btn-sm btn-primary btn-minus'
                onClick={() => onChangeCount('minus')}
              >
                <i className='fa fa-minus' />
              </button>
            </div>
            <span className='form-control form-control-sm bg-secondary text-center'>
              {counts}
            </span>
            <div className='input-group-btn'>
              <button
                className='btn btn-sm btn-primary btn-plus'
                onClick={() => onChangeCount('plus')}
              >
                <i className='fa fa-plus' />
              </button>
            </div>
          </div>
        </td>
        <td className='align-middle'>{item2.size}</td>
        <td className='align-middle'>{item2.color}</td>
        <td className='align-middle'>${item.price * item2.quantity}</td>
        {console.log('total', item2.quantity)}
        <td className='align-middle'>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => deleteUser(item, item2)}
          >
            <i className='fa fa-times' />
          </button>
        </td>
      </tr>
    </>
  )
}

export default Cartdetails
