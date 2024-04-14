import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import '../../css/components/Sidebar.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UploadDocument from './UploadDocument';
import CreateFolder from './CreateFolder';
import logo from '../../images/logo2.png';


const Sidebar = ({ parent_id, uploadFile, setUploadFile, uploadFolder, setUploadFolder }) => {
    const { pathname } = useLocation();
    const [navActive, setNavActive] = useState(1);

    useEffect(() => {
        if (pathname === '/') {
            setNavActive(1);
        } else if (pathname === '/recent') {
            setNavActive(2);
        }
        else if (pathname === '/starred') {
            setNavActive(3);
        } else if (pathname === '/bin') {
            setNavActive(4);
        }

    }, [pathname])
    return (
        <>
            <div className="sidebar">
                <div className="logo">
                    <img src={logo} style={{ width: "160px", marginTop: "20px" }} alt="" />
                </div>
                <div className="uploads">
                    <CreateFolder parent_id={parent_id} uploadFolder={uploadFolder} setUploadFolder={setUploadFolder}></CreateFolder>
                    <UploadDocument parent_id={parent_id} uploadFile={uploadFile} setUploadFile={setUploadFile}></UploadDocument>
                </div>
                <div className="menu">
                    <NavLink to="/" className="single-menu" id={navActive === 1 ? 'nav-active' : ''} onLoad={() => setNavActive(1)}>
                        <DashboardIcon className='menu-icon' />
                        <span className="route"> My Dashboard</span>
                    </NavLink>

                    <NavLink to="/recent" className="single-menu" id={navActive === 2 ? 'nav-active' : ''} onLoad={() => setNavActive(2)}>
                        <AccessTimeIcon className='menu-icon' />
                        <span className="route">Recent</span>
                    </NavLink>

                    {/* <NavLink to="/starred" className="single-menu" id={navActive === 3 ? 'nav-active' : ''} onLoad={() => setNavActive(3)}>
                        <StarBorderIcon className='menu-icon' />
                        <span className="route">Starred</span>
                    </NavLink> */}

                    <NavLink to="/bin" className="single-menu" id={navActive === 4 ? 'nav-active' : ''} onLoad={() => setNavActive(4)}>
                        <RestoreFromTrashIcon className='menu-icon' />
                        <span className="route">Bin</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar