import './App.css';
import Sidebar from './html/components/Sidebar';
import Header from './html/components/Header';
import Dashboard from './html/pages/Dashboard';
import Register from './html/pages/Register';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './html/pages/Login';
import ChangeProfile from './html/pages/ChangeProfile';
import ChangePassword from './html/pages/ChangePassword';
import { useEffect, useState } from 'react';
import ForgetPassword from './html/pages/ForgetPassword';
import Otp from './html/pages/Otp';
import ShareFile from './html/pages/ShareFile'
import Starred from './html/pages/Starred';
import Recent from './html/pages/Recent';
import Bin from './html/pages/Bin';


function App() {
  const [dataFromChild, setDataFromChild] = useState();
  const [searchInput, setSearchInput] = useState('');

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="left">
          <div>
            <Sidebar parent_id={dataFromChild}></Sidebar>
          </div>
        </div>
        <div className='right'>
          <div>
            <Header setSearchInput={setSearchInput}></Header>
          </div>
          <div className="main">
            <Routes>
              <Route path="/" element={userInfo ? <Dashboard searchInput={searchInput} setDataFromChild={setDataFromChild}></Dashboard> : <Login></Login>} />
              <Route path="/:parent_id" element={<Dashboard searchInput={searchInput} setDataFromChild={setDataFromChild}></Dashboard>} />
              <Route path="/register" element={<Register></Register>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path='/changeprofile' element={userInfo ? <ChangeProfile></ChangeProfile> : <Login></Login>} />
              <Route path='/changepassword' element={userInfo ? <ChangePassword></ChangePassword> : <Login></Login>} />
              <Route path='/forgetpassword' element={<ForgetPassword></ForgetPassword>} />
              <Route path='/otp/:email' element={<Otp></Otp>} />
              <Route path='/share/gmail' element={<ShareFile></ShareFile>} />
              <Route path='/starred' element={<Starred></Starred>} />
              <Route path='/recent' element={<Recent></Recent>} />
              <Route path='/bin' element={<Bin></Bin>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
