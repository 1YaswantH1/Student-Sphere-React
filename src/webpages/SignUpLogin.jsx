/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBnNHhkar1avPI_2HpzHUsoSWS4bYS_Fhw",
  authDomain: "student-sphere-c653f.firebaseapp.com",
  projectId: "student-sphere-c653f",
  storageBucket: "student-sphere-c653f.appspot.com",
  messagingSenderId: "49712095783",
  appId: "1:49712095783:web:e7ec8321c2c373259f2402",
  measurementId: "G-3774M7LB21"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();

// AuthContext to manage user state
const AuthContext = React.createContext();

// AuthProvider to provide auth state
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        sessionStorage.setItem('userId', user.uid); // Store user ID on login
      } else {
        sessionStorage.removeItem('userId'); // Remove user ID on logout
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
const useAuth = () => {
  return useContext(AuthContext);
};

// Protected Route (only for authenticated users)
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

// Main component to handle login, signup, logout, and protected routes
const SignUpLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const history = useHistory();  // To programmatically navigate after login/signup

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/polls');  // Redirect to polls page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push('/polls');  // Redirect to polls page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/login');  // Redirect to login page after logout
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          {currentUser ? (
            <div>
              <h1>Welcome {currentUser.email}</h1>
              <button onClick={handleLogout}>Logout</button>
              <Switch>
                <PrivateRoute path="/polls" component={() => <h2>Polls Page</h2>} />
                <Redirect from="/" to="/polls" />
              </Switch>
            </div>
          ) : (
            <div>
              <h2>{error && <span style={{ color: 'red' }}>{error}</span>}</h2>
              <h2>Login or Sign Up</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>

              <h3>Dont have an account?</h3>
              <form onSubmit={handleSignup}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default SignUpLogin;
