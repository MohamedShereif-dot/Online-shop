import React,{useContext, useEffect,useState} from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as YUP from 'yup'

export default function Register() {
  
  const [errMessage,setErrMessage] = useState(null);
  let navigate = useNavigate()


  function handleRegister(values){
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then(
      (res)=>{
        if(res.data.message=="success"){
          setErrMessage(null);
          navigate('/login');
        }
        else{
          setErrMessage(res.data.message);
        }
      }
    ).catch((error)=>{
      setErrMessage(error.response?.data?.message || "An unexpected error occurred");
    })
  }

  let validationSchema = YUP.object().shape({
    name:YUP.string().min(3,"name must at least 3 letters").max(12,"max letters 12 ").required('name is required'),
    email:YUP.string().email('Enter a valid email').required('email is required'),
    password:YUP.string().matches(/[A-Z][a-z][0-9a-zA-Z]{6,20}/,"password must contains Capital and small letter and at least 8 letters and max 20").required('password is required'),
    rePassword:YUP.string().oneOf([YUP.ref("password")],"password not match").required("rePassword is required"),
    phone:YUP.string().matches(/^01[0125][0-9]{8}$/,"").required('phone is required'),
    age:YUP.string().matches(/^[0-9]{1,2}$/,"").required('age is required')
  })


  let registerForm = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit:handleRegister,
    validationSchema:validationSchema
  })

  return (
    <>
      {errMessage? <div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {errMessage} </span>
</div>:null}
        <form className='w-1/2 mx-auto gap-y-3 flex flex-col' onSubmit={registerForm.handleSubmit}>
          <div>
            <label htmlFor="name" className='block my-1.5 '>name:</label>
            <input type="text" id='name' value={registerForm.values.name} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} name='name' className='border-2 rounded-md border-gray-200 w-full'/>
          </div>

            {registerForm.errors.name && registerForm.touched.name ?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"> {registerForm.errors.name} </span>
  </div>:null}

          <div>
            <label htmlFor="email" className='block my-1.5 '>email:</label>
            <input type="text" id='email' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name='email' className='border-2 rounded-md border-gray-200 w-full'/>
          </div>

{registerForm.errors.email && registerForm.touched.email ?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"> {registerForm.errors.email} </span>
  </div>:null}

          <div>
            <label htmlFor="password" className='block my-1.5 '>password:</label>
            <input type="password" id='password' value={registerForm.values.password} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} name='password' className='border-2 rounded-md border-gray-200 w-full'/>
          </div>
          
                        {registerForm.errors.password && registerForm.touched.password?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"> {registerForm.errors.password} </span>
  </div>:null}

          <div>
            <label htmlFor="rePassword" className='block my-1.5 '>rePassword:</label>
            <input type="password" id='rePassword' value={registerForm.values.rePassword} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} name='rePassword' className='border-2 rounded-md border-gray-200 w-full'/>
          </div>

{registerForm.errors.rePassword && registerForm.touched.rePassword?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"> {registerForm.errors.rePassword} </span>
  </div>:null}

          <div>
            <label htmlFor="phone" className='block my-1.5 '>phone:</label>
            <input type="tel" id='phone' name='phone' value={registerForm.values.phone} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} className='border-2 rounded-md border-gray-200 w-full'/>
          </div>

{registerForm.errors.phone && registerForm.touched.phone?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"> {registerForm.errors.phone} </span>
  </div>:null}

          <div>
            <label htmlFor="age" className='block my-1.5 '>age:</label>
            <input type="tel" id='age' name='age' onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} className='border-2 rounded-md border-gray-200 w-full'/>
          </div>

{registerForm.errors.age && registerForm.touched.age?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"> {} </span>
  </div>:null}
  
          <button className='bg-green-400 w-1/4 cursor-pointer' >Register</button>

        </form>
    </>
  )
}
