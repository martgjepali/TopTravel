import React from 'react';
import '../../App.css';


export default function SignUp() {
  return (
    // Add FirstName, LastName, username, Email, Phone, DateOfBirth
    
    <div className='form-modal__container'>
      <div className='form-modal__wrapper' >
        <div className='sign-up'>
          <img src='/images/img-8.jpg' alt='Camels in the desert'></img>
        </div>
        <div className='sign-up__container'>
          <h2>Sign Up</h2>
          <form className='sign-up__form'>
          <label>FirstName</label> <br></br>
            <input type='text' placeholder='Jason'></input><br></br>
          <label>LastName</label> <br></br>
            <input type='text' placeholder='Bourne'></input><br></br>
          <label>Username</label> <br></br>
            <input type='text' placeholder='toptravel'></input><br></br>
           <label>Email</label> <br></br>
            <input type='text' placeholder='toptravel@gmail.com'></input><br></br>
            <label>Password</label> <br></br>
            <input type='password' placeholder='Password'></input><br></br>
          <label>Phone</label> <br></br>
            <input type='text' placeholder='Phone Number'></input><br></br>
          <label>DateOfBirth</label> <br></br>
            <input type='text' placeholder='Date Of Birth'></input><br></br>
            <button type='submit' className='btn-sign'>Sign Up</button>
          </form>

          <div>
            <p className='have-account'>Have an account? <span>Log In here </span></p>
          </div>
        </div>

      </div>
    </div>
  );
}