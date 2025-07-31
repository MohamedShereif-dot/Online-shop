import React,{useContext, useEffect,useState} from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as YUP from 'yup'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [errorMessage,setErrorMessage] = useState(null);
  const {setUserToken}=useContext(AuthContext);
 
  useEffect(() => {
    setErrorMessage(null);
    setUserToken(localStorage.getItem('userToken'));
    if(localStorage.getItem('userToken')) {
      navigate('/');
    }
  }, []);

  const navigate = useNavigate();

  const validationSchema = YUP.object().shape({
    email:YUP.string().email("enter a valid email").required("email is required"),
    password:YUP.string().matches(/[A-Z][a-z][0-9a-zA-Z]{6,20}/,"password must contains Capital and small letter and at least 8 letters and max 20").required('password is required')
  })

  function handleLogIn(values){
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then((res)=>{
      console.log(res);
      if(res.data.token){
        setErrorMessage(null);
        setUserToken(res.data.token); 
        localStorage.setItem('userToken',res.data.token)
        navigate('/');
      } else {
        setErrorMessage(res.data.msg);
      }
    }).catch((error)=>{
      setErrorMessage(error.response?.data?.msg || "An unexpected error occurred")
    });
  }

  const logInForm = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:handleLogIn,
    validationSchema
  })
  return (
    <>
    {errorMessage?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {errorMessage} </span>
</div>:null}
        <form className='w-1/2 mx-auto gap-y-3 flex flex-col' onSubmit={logInForm.handleSubmit}>
          <div>
            <label htmlFor="email" className='block my-1.5 '>email:</label>
            <input type="text" id='email' className='border-2 rounded-md border-gray-200 w-full' onChange={logInForm.handleChange} onBlur={logInForm.handleBlur} value={logInForm.values.email}/>
          </div>

{logInForm.errors.email && logInForm.touched.email?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {logInForm.errors.email} </span>
</div>:null}
          <div>
            <label htmlFor="password" className='block my-1.5'>password:</label>
            <input type="text" id='password' className='border-2 rounded-md border-gray-200 w-full' onChange={logInForm.handleChange} onBlur={logInForm.handleBlur} value={logInForm.values.password}/>
          </div>

          {logInForm.errors.password && logInForm.touched.password?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {logInForm.errors.password} </span>
</div>:null}
          <button type='submit' className='bg-green-400 w-1/4 cursor-pointer'>Sign in</button>
        </form>
    </>
  )
}
