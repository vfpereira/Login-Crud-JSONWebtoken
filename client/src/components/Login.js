import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ onHandleChange }) => {
  return (
    <div className='container-login100'>
      <div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
        <form className='login100-form validate-form'>
          <span className='login100-form-title p-b-49'>Login</span>

          <div className='wrap-input100 validate-input m-b-23' data-validate='Username is required'>
            <span className='label-input100'>E-mail</span>
            <input className='input100' type='text' name='username' placeholder='Digite seu e-mail' onChange={onHandleChange} />
          </div>

          <div className='wrap-input100 validate-input' data-validate='Password is required'>
            <span className='label-input100'>Senha</span>
            <input className='input100' type='password' name='pass' placeholder='Digite sua senha' />
          </div>

          <div className='text-right p-t-8 p-b-31' />

          <div className='container-login100-form-btn'>
            <div className='wrap-login100-form-btn'>
              <div className='login100-form-bgbtn' />
              <button className='login100-form-btn'>
                Login
              </button>
            </div>
          </div>
          <div className='flex-col-c p-t-55'>
            <Link className='txt2' to='/register'>Registre-se</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
