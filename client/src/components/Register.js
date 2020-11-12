import React from 'react'
import { Link } from 'react-router-dom'

const Register = ({ register, onHandleChange, onHandleRegisterSubmit }) => {
  return (
    <div className='container-login100'>
      <div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
        <form className='login100-form validate-form' onSubmit={onHandleRegisterSubmit}>
          <span className='login100-form-title p-b-49'>Register</span>

          {
            register.validation && register.validation.length !== 0
              ? (
                register.validation.map((data, i) => (
                  <div key={i} className='m-b-23'>
                    <span key={i} style={{ color: '#c23616' }} className='label-input100'>{data}</span>
                  </div>
                ))
              )
              : ''
          }

          <div className='wrap-input100 validate-input m-b-23' data-validate='E-mail is required'>
            <span className='label-input100'>E-mail</span>
            <input className='input100' type='text' name='email' placeholder='Type your e-mail' value={register.email} onChange={(e) => onHandleChange(e, 'register')} />
          </div>

          <div className='wrap-input100 validate-input' data-validate='Password is required'>
            <span className='label-input100'>Password</span>
            <input className='input100' type='password' name='password' value={register.password} onChange={(e) => onHandleChange(e, 'register')} placeholder='Type your Password' />
          </div>

          <div className='text-right p-t-8 p-b-31' />

          <div className='container-login100-form-btn'>
            <div className='wrap-login100-form-btn'>
              <div className='login100-form-bgbtn' />
              <button className='login100-form-btn'>
                Register
              </button>
            </div>
          </div>
          <div className='flex-col-c p-t-55'>
            <Link to='/' className='txt2'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
