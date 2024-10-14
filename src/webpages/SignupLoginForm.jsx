import React from 'react';
import './SignUpForm.css'; // Include this for custom styles

function SignUpForm() {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src="/images/logo.jpg" alt="Sitemark" className="logo" /> {/* Add your logo */}
        <h2>Sign up</h2>
        
        {/* Full Name Field */}
        <label htmlFor="fullname">Full name</label>
        <input type="text" id="fullname" name="fullname" placeholder="Jon Snow" />
        
        {/* Email Field */}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="your@email.com" />
        
        {/* Password Field */}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="••••••••" />
        
        {/* Checkbox */}
        <div className="checkbox-container">
          <input type="checkbox" id="emailUpdates" name="emailUpdates" />
          <label htmlFor="emailUpdates">I want to receive updates via email.</label>
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="signup-btn">Sign up</button>

        <p>Already have an account? <a href="/signin">Sign in</a></p>

        {/* Or Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Sign Up */}
        <button className="google-btn">
          <img src="/images/google-icon.png" alt="Google" />
          Sign up with Google
        </button>

        {/* Facebook Sign Up */}
        <button className="facebook-btn">
          <img src="/images/facebook-icon.png" alt="Facebook" />
          Sign up with Facebook
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
