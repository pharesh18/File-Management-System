import React, { useState } from 'react';
import '../../css/components/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
// import profile from '../../images/profile1.jpg'
import { NavLink, useNavigate } from 'react-router-dom';

const AdminHeader = ({ setSearchInput }) => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        // navigate('/login');
        window.location.href = '/login';
    }

    return (
        <>
            <div className="header">
                <div style={{ visibility: "hidden" }} className="searchbar">
                    <div className="search">
                        <SearchIcon className="search-icon"></SearchIcon>
                        <input type="text" className='search-input' placeholder='Search file' onChange={(e) => setSearchInput(e.target.value)} />
                    </div>
                    <input type="button" className='search-button' value="Browse" />
                </div>

                <div className="profile">
                    <div className="profile-dropdown" onClick={toggleDropdown}>
                        <img src={`http://localhost:8000/public/profiles/${userInfo?.profile}`} alt="" className='profile-image' />
                        <ArrowDropDownRoundedIcon></ArrowDropDownRoundedIcon>
                        {isDropdownOpen && (
                            <>
                                <div className="dropdown-content">
                                    <NavLink to="/changeprofile" className="dropdown-menu">Change Profile</NavLink>
                                    <NavLink to="/changepassword" className="dropdown-menu">Change Password</NavLink>
                                    <NavLink to="#" className="dropdown-menu" onClick={handleLogout}>Logout</NavLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHeader
