import React, { useState } from 'react';
import './Login.css';
import swal from 'sweetalert';


export default function (props) {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  var defaultEmail="admin@info.com";
  var defaultPassword="1";

  const handleSubmit = async e => {
    e.preventDefault();

    if (e.target.email.value ==defaultEmail && e.target.password.value == defaultPassword ) {
      var user = {
        username :e.target.email.value,
        password:e.target.password.value 
      }
      var encoded = btoa(JSON.stringify(user))
      swal("Success", "Login successful!", {
        buttons: false,
        timer: 500,
      })
      localStorage.setItem('user', encoded);
      localStorage.setItem("authenticated", true);
      window.location.href = "/dashboard";
    } else {
      swal("Failed", "User Information Incorrect!");
    }
  }
  return (
    <div className="Login-form-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <div className="Login-form-content">
          <h3 className="Login-form-title">MANAGE COURSES</h3>
          <h3 className="Login-form-sing-in">SIGN IN</h3>
          <h4 className="Login-form-sing-muted">Enter your credentials to access your account</h4>
          <div className="form-group mt-4 form-label">
            <label>Email </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter your password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-warning submit-btn">
              SIGN IN
            </button>
          </div>
          <p className=" text-center mt-4">
            Forgot your password? <a className="forgot-password" href="/login"> Reset Password</a>
          </p>
        </div>
      </form>
    </div>
  )
}