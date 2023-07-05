import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/pages/Dashboard.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import gmailImg from '../../images/gmail1.jpg';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const Dashboard = () => {
    const [docData, setDocData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = (index) => {
        // const dropdown = document.querySelector(`.file-dropdown-content[data-index="${index}"]`);
        // console.log(dropdown);
        // dropdown.classList.add("file-dropdown-content");
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handlePreview = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleShare = () => {
        const open = document.querySelector(".share-bg");
        open.style.display = "block";
    }

    const handleClose = () => {
        const close = document.querySelector(".share-bg");
        close.style.display = "none";
    }

    const getDocs = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                _id: userInfo._id,
                accesstoken: userInfo.accesstoken
            };
            const { data } = await axios.get("http://localhost:8000/api/doc/getdocs", { headers });
            if (data.error) {
                toast.error(data.message);
            } else {
                setDocData(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDocs();
    }, []);

    return (
        <>
            <div className='dashboard'>
                <div className="dashboard-title">
                    <h2>My files</h2>
                </div>
                <div className="dashboard-main">
                    {
                        docData?.length > 0 ? (
                            docData?.map((val, index) => {
                                return (
                                    <>
                                        <div className="dashboard-file" key={index}>
                                            <div className="file-header">
                                                <p className='file-name'>{val.filename.split('_')[1]}</p>
                                                <div className="dots" onClick={toggleDropdown} data-index={index}>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                </div>
                                                {isDropdownOpen && (
                                                    <div className="file-dropdown-content" data-index={index}>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={handleShare}>Share</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#">Download</NavLink>
                                                    </div>
                                                )}
                                            </div>
                                            <img className='dashboard-file-image' src="../../images/pdf.png" onClick={() => { handlePreview(`http://localhost:8000/public/documents/${val.filename}`) }} alt="" />

                                            {/* share file html */}
                                            <div className="share-bg">
                                                <div className='share-popup'>
                                                    <div className="share-header">
                                                        <h2>Share via</h2>
                                                        <div className="share-close">
                                                            <CloseOutlinedIcon onClick={handleClose}></CloseOutlinedIcon>
                                                        </div>
                                                    </div>
                                                    <div className="share-icons">
                                                        <div className="single-icon">
                                                            <NavLink to="/share/gmail" state={{ email: userInfo.email, fname: val.filename }}><img src={gmailImg} className='icon' alt="" /></NavLink>
                                                            <span>Gmail</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        ) : (
                            <>
                                <div>NO DATA FOUND</div>
                            </>
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default Dashboard