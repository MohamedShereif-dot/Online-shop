import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './Payment.module.css';
import axios from 'axios';
import { cartContext } from '../CartContextProvider/CartContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  let navigate = useNavigate();
  let { cartId } = useContext(cartContext);

  function cashOrder(values) {
    let shippingAddress = {
      shippingAddress: values
    };
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,  {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then((res) => {
      if (res.data.status === 'success') {
        console.log('Cash order submitted successfully',res.data.data);
        localStorage.setItem('cartItems', JSON.stringify(res.data.data));
      }
    }).catch((error) => {
      console.log('Error submitting cash order:', error);
    }).finally(()=>{
      navigate('/allorders');
    });
  }

  function onlineOrder(values) {
    let shippingAddress = {
      shippingAddress: values
    };

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, shippingAddress, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then((res) => {
      if (res.data.session && res.data.session.url) {
        window.open(res.data.session.url, '_self');
      }
    }).catch((error) => {
      console.log('Error submitting online order:', error);
    }).finally(()=>{
      navigate('/allorders');
    });
  }

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
    validationSchema: Yup.object().shape({
      details: Yup.string().required('Details are required'),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
        .required('Phone is required'),
      city: Yup.string().required('City is required')
    })
  });

  const handlePaymentMethod = (method) => {
    if (formik.isValid && Object.keys(formik.touched).length > 0) {
      if (method === 'cash') {
        cashOrder(formik.values);
      } else if (method === 'online') {
        onlineOrder(formik.values);
      }
    } else {
      formik.validateForm().then(errors => {
        if (Object.keys(errors).length === 0) {
          if (method === 'cash') {
            cashOrder(formik.values);
          } else if (method === 'online') {
            onlineOrder(formik.values);
          }
        } else {
          formik.setTouched({
            details: true,
            phone: true,
            city: true
          });
        }
      });
    }
  };

  return (
    <div className={`${style.paymentContainer} grid grid-cols-1 w-1/2 p-6 m-auto`}>
      <form onSubmit={formik.handleSubmit} className="w-full mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
          {formik.touched.details && formik.errors.details ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.details}</div>
          ) : null}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone (01XXXXXXXXX)
          </label>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
          ) : null}
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.city}</div>
          ) : null}
        </div>
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handlePaymentMethod('cash')}
            className="transition-all duration-400 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Processing...' : 'Cash'}
          </button>
          
          <button
            type="button"
            onClick={() => handlePaymentMethod('online')}
            className="transition-all duration-400 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Processing...' : 'Online'}
          </button>
        </div>
      </form>
    </div>
  );
}