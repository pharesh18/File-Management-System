import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../../css/components/Sidebar.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadDocument from './UploadDocument';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="logo">
                    <h1>ADMIN</h1>
                </div>
                <div className="uploads">
                    {/* <div className="folder">
                        <span className="plus">+</span>
                        <span>create folder</span>
                    </div> */}
                    <UploadDocument></UploadDocument>
                </div>
                <div className="menu">
                    <NavLink to="/" className="single-menu">
                        <span><DashboardIcon /></span>
                        <span className="route">Dashboard</span>
                    </NavLink>

                    <NavLink to="/" className="single-menu">
                        <span><DashboardIcon /></span>
                        <span className="route">Dashboard</span>
                    </NavLink>

                    <NavLink to="/" className="single-menu">
                        <span><DashboardIcon /></span>
                        <span className="route">Dashboard</span>
                    </NavLink>

                    <NavLink to="/" className="single-menu">
                        <span><DashboardIcon /></span>
                        <span className="route">Dashboard</span>
                    </NavLink>

                </div>
            </div>
        </>
    )
}

export default Sidebar