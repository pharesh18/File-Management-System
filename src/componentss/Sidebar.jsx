import React from 'react';
import "./Sidebar.css";

import { NavLink } from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <>
      <aside>
        <div class="top">
          <div class="logo">
            <p> Adm<span className="danger">i</span>n</p>
          </div>
          <div className="close" id="close-btn">
            <ClearIcon />
          </div>
        </div>

        <div className='upload-btn'>
          <p>upload</p>
        </div>

        <div className="sidebar">
          <div className='menu'>
            <span><DashboardIcon /></span>
            <NavLink to="/" id="text">Dashboard</NavLink>
          </div>

          <div className='menu'>
            <span>  <StarIcon /></span>
            <NavLink to="/bookmark" id="text">Bookmarks</NavLink>
          </div>

          <div className='menu'>
            <span> <PeopleOutlinedIcon /> </span>
            <NavLink to="/sharedfile" id="text">Shared files</NavLink>
          </div>

          <div className='menu'>
            <span> <DeleteIcon /> </span>
            <NavLink to="/trash" id="text">Trash</NavLink>
          </div>

          <div className='menu'>
            <span> <LogoutIcon /></span>
            <NavLink to="/logout" id="text" >LogOut</NavLink>
          </div>
        </div>
      </aside>

    </>
  )
}

export default Sidebar