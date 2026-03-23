import React, { useState } from 'react'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'





function Ttt({ insideRegister }) {

  const navigate = useNavigate()
  const [viewPassword, setViewPassword] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  // console.log(userDetails);

  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userDetails
    if (email && username && password) {
      // toast.success("API Call")
      try {
        const result = await registerAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Register successfully... Please Login to Bookstore!!!!`)
          setUserDetails({ username: "", email: "", password: "" })
          navigate('/login')
        }
        else if (result.status == 409) {
          toast.warning(result.response.data)
          setUserDetails({ username: "", email: "", password: "" })
          navigate('/login')
        } else {
          console.log(result);
          toast.error("Somthing went wrong")
          setUserDetails({ username: "", email: "", password: "" })
        }
      } catch (err) {
        console.log(err);

      }

    } else {
      toast.info("Please fill the form completely")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userDetails
    if (email && password) {
      // toast.success("API Call")
      try {
        // api call
        const result = await loginAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          toast.success("Login Successfull!!!")
          sessionStorage.setItem("token", result.data.token)
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          setTimeout(() => {
            if (result.data.user.role == "admin") {
              navigate('/admin/home')
            } else {
              navigate('/')
            }
          }, 2500)
        } else if (result.status == 401 || result.status == 404) {
          toast.warning(result.response.data)
          setUserDetails({ username: "", email: "", password: "" })
        } else {
          toast.error("Something went wrong!!!")
          setUserDetails({ username: "", email: "", password: "" })
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.info("Please fill the form completely!!!")
    }
  }

 


  return (
    <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url(/banner.jpg)] bg-cover bg-center'>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-black text-center">BOOK STORE</h1>
        <div style={{ width: '400px' }} className="bg-black text-white p-5 flex flex-col justify-center items-center my-5">
          <div style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='border mb-5 flex justify-center items-center'>
            <FaUser className='text-3xl' />
          </div>

          <h2 className='text-2xl'>{insideRegister ? "Register" : "Login"}</h2>
          <form className='my-5 w-full'>
            {/* username */}
            {insideRegister &&
              <input onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} type="text" placeholder=' Username' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded my-5' />
            }

            {/* email */}
            <input onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} value={userDetails.email} type="text" placeholder='Email ID' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded my-5' />
            {/* password */}
            <div className='flex items-center'>
              <input onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} type={viewPassword ? "text" : "password"} placeholder=' Password ' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded my-5' />
              {
                viewPassword ?
                  <FaEyeSlash onClick={() => setViewPassword(!viewPassword)} className='text-gray-400 cursor-pointer' style={{
                    marginLeft: '-30px',
                    
                  }} />
                  :
                  <FaEye onClick={() => setViewPassword(!viewPassword)} className='text-gray-400 cursor-pointer' style={{
                    marginLeft: '-30px',
                    
                  }} />
              }
            </div>
            {/* forgot password */}


            <div className="flex justify-between mb-5">
              <p className="text-xs text-orange-300">*Never share your password with others
              </p>
              {!insideRegister && <button className='text-xs underline'>Forgot Password</button>}
            </div>

            {/* login/register btn */}
            <div className="text-center">
              {
                insideRegister ?
                  <button onClick={handleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button>
                  :
                  <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>
              }
            </div>
            


            {
              <div className="my-5 text-center">
                {
                  insideRegister ?
                    <p className="text-blue-600">Already a user ?  <Link to={'/login'} className='underline ms-5'>Login</Link></p>
                    :
                    <p className="text-blue-600">Already a New user ?  <Link to={'/register'} className='underline ms-5' >Register</Link></p>

                }
              </div>
            }
          </form>
        </div>
      </div>
   

    </div>
  )
}

export default Ttt