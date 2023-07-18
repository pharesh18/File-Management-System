import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/pages/Dashboard.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import gmailImg from '../../images/gmail1.jpg';
import textImg from '../../images/txt.png';
import pdfImg from '../../images/pdff.png';
import fileImg from '../../images/file.png';
import { deleteFile, downloadFile } from '../../Actions/docAction';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const Recent = ({ searchInput, setDataFromChild }) => {
    const { parent_id } = useParams();
    setDataFromChild(parent_id);

    const [openLastWeekDropdown, setOpenLastWeekDropdown] = useState(null);
    const [openLastMonthDropdown, setOpenLastMonthDropdown] = useState(null);
    const [openOldDataDropdown, setOpenOldDataDropdown] = useState(null);
    const [docData, setDocData] = useState({});

    const toggleLastWeekDropdown = (index) => {
        if (openLastWeekDropdown === index) {
            setOpenLastWeekDropdown(null); // Close the dropdown if already open
        } else {
            setOpenLastWeekDropdown(index); // Open the dropdown of the clicked card
        }
    };

    const toggleLastMonthDropdown = (index) => {
        if (openLastMonthDropdown === index) {
            setOpenLastMonthDropdown(null); // Close the dropdown if already open
        } else {
            setOpenLastMonthDropdown(index); // Open the dropdown of the clicked card
        }
    };

    const toggleOldDataDropdown = (index) => {
        if (openOldDataDropdown === index) {
            setOpenOldDataDropdown(null); // Close the dropdown if already open
        } else {
            setOpenOldDataDropdown(index); // Open the dropdown of the clicked card
        }
    };



    const returnImage = (val) => {
        const extension = val.filename.split('.')[(val.filename.split('.').length - 1)];
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png')
            return `http://localhost:8000/public/documents/${val.filename}`
        else if (extension === 'pdf')
            return pdfImg;
        else if (extension === 'txt')
            return textImg;
        else
            return fileImg
    }

    const handlePreview = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };


    const handleShare = () => {
        const open = document.querySelector(".share-bg");
        open.style.display = "block";
    }

    const handleDownload = (filename, originalname) => {
        const body = {
            filename: filename,
            originalname: originalname
        }
        downloadFile(body);
    }

    const handleClose = () => {
        const close = document.querySelector(".share-bg");
        close.style.display = "none";
    }


    const getDocs = async () => {
        const body = {
            parent_id: parent_id ? parent_id : "null",
            searchInput: searchInput ? searchInput : null
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                _id: userInfo._id,
                accesstoken: userInfo.accesstoken
            };

            const { data } = await axios.post("http://localhost:8000/api/doc/recent/get", body, { headers });
            console.log(data);
            if (data.error) {
                toast.error(data.message);
            } else {
                // console.log(data.data);
                setDocData(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = (filename) => {
        const body = {
            filename: filename
        }
        setTimeout(() => {
            getDocs();
        }, 1000)
        deleteFile(body);
    }

    useEffect(() => {
        getDocs();
    }, [parent_id, searchInput]);

    return (
        <>
            <div className='dashboard'>
                <div className="dashboard-files">
                    {docData?.lastWeek?.length > 0 ?
                        <div className="dashboard-title">
                            <h3>Last Week</h3>
                        </div> : null
                    }

                    <div className="dashboard-main">
                        {
                            docData?.lastWeek?.length > 0 ? (
                                docData?.lastWeek?.map((val, index) => {
                                    const filePath = returnImage(val);
                                    return (
                                        <div className="dashboard-file" key={index}>
                                            <div className="file-header">
                                                <p className='file-name'>{val.originalname}</p>
                                                <div className="dots" onClick={() => toggleLastWeekDropdown(index)}>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                </div>
                                                {openLastWeekDropdown === index && (
                                                    <div className="file-dropdown-content">
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={handleShare}>Share</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleDownload(val.filename, val.originalname)}>Download</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleDelete(val.filename)}>Delete</NavLink>
                                                    </div>
                                                )}
                                            </div>
                                            <img className='dashboard-file-image' src={filePath} onClick={() => { handlePreview(`http://localhost:8000/public/documents/${val.filename}`) }} alt="" />

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
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>


                {/* last month */}


                <div className="dashboard-files">
                    {docData?.lastMonth?.length > 0 ?
                        <div className="dashboard-title">
                            <h3>Last Month</h3>
                        </div> : null
                    }

                    <div className="dashboard-main">
                        {
                            docData?.lastMonth?.length > 0 ? (
                                docData?.lastMonth?.map((val, index) => {
                                    const filePath = returnImage(val);
                                    return (
                                        <div className="dashboard-file" key={index}>
                                            <div className="file-header">
                                                <p className='file-name'>{val.originalname}</p>
                                                <div className="dots" onClick={() => toggleLastMonthDropdown(index)}>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                </div>
                                                {openLastMonthDropdown === index && (
                                                    <div className="file-dropdown-content">
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={handleShare}>Share</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleDownload(val.filename, val.originalname)}>Download</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleDelete(val.filename)}>Delete</NavLink>
                                                    </div>
                                                )}
                                            </div>
                                            <img className='dashboard-file-image' src={filePath} onClick={() => { handlePreview(`http://localhost:8000/public/documents/${val.filename}`) }} alt="" />

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
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>

                <div className="dashboard-files">
                    {docData?.oldData?.length > 0 ?
                        <div className="dashboard-title">
                            <h3>Old Files</h3>
                        </div> : null
                    }

                    <div className="dashboard-main">
                        {
                            docData?.oldData?.length > 0 ? (
                                docData?.oldData?.map((val, index) => {
                                    const filePath = returnImage(val);
                                    return (
                                        <div className="dashboard-file" key={index}>
                                            <div className="file-header">
                                                <p className='file-name'>{val.originalname}</p>
                                                <div className="dots" onClick={() => toggleOldDataDropdown(index)}>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                </div>
                                                {openOldDataDropdown === index && (
                                                    <div className="file-dropdown-content">
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={handleShare}>Share</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleDownload(val.filename, val.originalname)}>Download</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleDelete(val.filename)}>Delete</NavLink>
                                                    </div>
                                                )}
                                            </div>
                                            <img className='dashboard-file-image' src={filePath} onClick={() => { handlePreview(`http://localhost:8000/public/documents/${val.filename}`) }} alt="" />

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
                                    )
                                })
                            ) : null
                        }

                        {
                            (
                                (!docData?.lastWeek?.length > 0) &&
                                (!docData?.lastMonth?.length > 0) &&
                                (!docData?.oldData?.length > 0)
                            ) ? <div>No data found</div> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recent