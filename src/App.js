import './App.css';
import Sidebar from './html/components/Sidebar';
import Header from './html/components/Header';
import Dashboard from './html/pages/Dashboard';
import Register from './html/pages/Register';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './html/pages/Login';
import ChangeProfile from './html/pages/ChangeProfile';
import ChangePassword from './html/pages/ChangePassword';
import { useEffect } from 'react';
import ForgetPassword from './html/pages/ForgetPassword';
import Otp from './html/pages/Otp';
import ShareFile from './html/pages/ShareFile';

function App() {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  useEffect(() => {
    // window.location.reload();
  }, [userInfo]);

  return (
    <Router>
      <div className="App">
        <div className="left">
          <div>
            <Sidebar></Sidebar>
          </div>
        </div>
        <div className='right'>
          <div>
            <Header></Header>
          </div>
          <div className="main">
            <Routes>
              <Route path="/" element={userInfo ? <Dashboard></Dashboard> : <Login></Login>} />
              <Route path="/register" element={<Register></Register>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path='/changeprofile' element={userInfo ? <ChangeProfile></ChangeProfile> : <Login></Login>} />
              <Route path='/changepassword' element={userInfo ? <ChangePassword></ChangePassword> : <Login></Login>} />
              <Route path='/forgetpassword' element={<ForgetPassword></ForgetPassword>} />
              <Route path='/otp/:email' element={<Otp></Otp>} />
              <Route path='/share/gmail' element={<ShareFile></ShareFile>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
