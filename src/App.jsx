// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './webpages/Hompage';
import Polls from './webpages/Polls';
// import SignupLoginForm from './webpages/SignupLoginForm';

// import Login from './webpages/Login';

// import SportsPage from './webpages/SportsPage';
// import EventsPage from './webpages/EventsPage';

// removed 
// import ComplaintBoxPage from './webpages/ComplaintBoxPage';
// import IdeasPage from './webpages/IdeasPage';

// import Login from './webpages/Login';

// import SignInSignUpPage from './webpages/SignInSignUpPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="/sports" element={<SportsPage />} /> */}
        {/* <Route path="/events" element={<EventsPage />} /> */}
        {/* <Route path="/complaint-box" element={<ComplaintBoxPage />} /> */}
        {/* <Route path="/ideas" element={<IdeasPage />} /> */}
        <Route path="/polls" element={<Polls/>} />

        {/* <Route path='/login' element={<Login/>}/> */}
        
        {/* <Route path="/login" element={<SignupLoginForm/>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
