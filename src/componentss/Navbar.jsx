import React, { useRef, useState } from 'react'
import './Navbar.css';

import profile from '../images/profile1.jpg';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

    var menu_btn = document.getElementsByClassName('menu-bar');
    var sidebar = document.querySelector("aside");


    // menu_btn.addEventListener('click', () => {
    //     sidebar.style.display = 'block';
    // });
    const fun1 = () => {
        sidebar.style.display = 'block';
    }

    const Menu = [
        {
            name: 'Profile',
            icon: <AccountCircleIcon />,
            path: '',
        },
        {
            name: 'LogOut',
            icon: <LogoutIcon />,
            path: '',

        },
    ]
    const [open, setOpen] = useState(false);

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpen(false);
        }
    });

    return (
        <div className='navbar'>

            <div className='middle'>
                <input type='text' placeholder='Search Here...' className='inputfield' />
                <p> <SearchIcon /></p>
            </div>
            <div className='menu-btn'>
                <MenuIcon />
            </div>
            <div className='right'>
                <img src={profile} className='profile-img' onClick={() => setOpen(!open)} ref={imgRef} />
                {
                    open && (<div className='dropdown' ref={menuRef}>
                        <ul>
                            {
                                Menu.map((menu) => {
                                    return (
                                        <ul>
                                            <li className='icons' key={menu}>{menu.icon}</li>
                                            <li className='name' key={menu}>{menu.name}</li>

                                        </ul>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    )
                }
            </div>

        </div>
    )
}

export default Navbar;
