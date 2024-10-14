import { useState } from 'react';
import '../css/Login.css'; // Assuming you are using the same CSS

const Login = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', { email, password, confirmPassword });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  const showLogin = () => setIsSignup(false);
  const showSignup = () => setIsSignup(true);

  return (
    <div className="auth-body">
      {isSignup ? (
        <div className="form-container signupForm">
          <h2 className="form-title">Signup</h2>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="form-input"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <input type="submit" className="form-submit" value="Sign Up" />
          </form>
          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={showLogin}>Login here</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="form-container loginForm">
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" className="form-submit" value="Login" />
          </form>
          <div className="form-footer">
            <p>
              Dont have an account?{' '}
              <a href="#" onClick={showSignup}>Signup here</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
