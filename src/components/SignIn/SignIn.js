import React, { Component } from "react";
import { Link } from "react-router-dom";
import './SignIn.css'

export class SignIn extends Component {
  login() {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
      }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
      }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  render() {
    return (
      // <div className="loginPage">
      //   <h1 className="welcome">Kaylin's Kitchen</h1>
      //   <div className="loginBox">
      //     <h3 className="signInMessage">
      //       Sign up to start your personalized recipe search.
      //     </h3>
      //     <button className="loginButton" onClick={this.login}>
      //       Login
      //     </button>
      //   </div>
      // </div>
      <div className='home'>
        <div className='info-container'>
          <div className='logo-container'>
            <h1 className='logo'>KK</h1>
          </div>
          <h1 className='title'>Kaylin's Kitchen</h1>
          <h2 className='text'>Your personalized online recipe book.</h2>
        </div>
        <div className='toggle'></div>
        <div className='login-container'>
          <div className='start-buttons'>
            <button onClick={this.login} className='signup-button'>Start for free!</button>
            <Link to="/dashboard">
              <button className='guest-button'>Take a test drive</button>
            </Link>
          </div>
          <button onClick={this.login} className='login-button'>LOGIN</button>
        </div>
      </div>
    );
  }
}

export default SignIn;
