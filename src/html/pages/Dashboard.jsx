import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/pages/Dashboard.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import gmailImg from '../../images/gmail1.jpg';
import folderImg from '../../images/folder.png';
import textImg from '../../images/txt.png';
import pdfImg from '../../images/pdff.png';
import fileImg from '../../images/file.png';
import { deleteFile, downloadFile } from '../../Actions/docAction';
import { deleteFolder } from '../../Actions/folderAction';
import ApiCaller from '../../apiCaller/ApiCaller';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const Dashboard = ({ searchInput, uploadFile, uploadFolder, setDataFromChild }) => {
    const { parent_id } = useParams();
    setDataFromChild(parent_id);

    const [openFileDropdown, setOpenFileDropdown] = useState(null);
    const [openFolderDropdown, setOpenFolderDropdown] = useState(null);
    const [docData, setDocData] = useState([]);
    const [folders, setFolders] = useState([]);

    const toggleDropdown = (index) => {
        if (openFileDropdown === index) {
            setOpenFileDropdown(null); // Close the dropdown if already open
        } else {
            setOpenFileDropdown(index); // Open the dropdown of the clicked card
        }
    };

    const toggleFolderDropdown = (index) => {
        if (openFolderDropdown === index) {
            setOpenFolderDropdown(null); // Close the dropdown if already open
        } else {
            setOpenFolderDropdown(index); // Open the dropdown of the clicked card
        }
    }

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
        setOpenFileDropdown(null);
    }

    const handleDownload = (filename, originalname) => {
        const body = {
            filename: filename,
            originalname: originalname
        }
        downloadFile(body);
        setOpenFileDropdown(null);
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
            const { data } = await axios.post(`${ApiCaller.site}/doc/getdocs`, body, { headers });
            if (data.error) {
                toast.error(data.message);
            } else {
                setDocData(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }


    const getFolders = async () => {
        const body = {
            parent_id: parent_id ? parent_id : null
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                _id: userInfo._id,
                accesstoken: userInfo.accesstoken
            };

            const { data } = await axios.post(`${ApiCaller.site}/folder/get`, body, { headers });
            if (data.error) {
                toast.error(data.message);
            } else {
                setFolders(data.data);
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
        setOpenFileDropdown(null);
    }

    const handleDeleteFolder = (unique_id) => {
        const body = {
            unique_id: unique_id
        }
        setTimeout(() => {
            getFolders();
        }, 1000)
        deleteFolder(body);
        setOpenFolderDropdown(null);
    }

    useEffect(() => {
        getFolders();
        getDocs();
    }, [parent_id, searchInput, uploadFile, uploadFolder]);

    return (
        <>
            <div className='dashboard'>
                {folders.length > 0 ?
                    <div className="dashboard-title">
                        <h3>Folders</h3>
                        {/* <div className="create-upload">
                        <CreateFolder parent_id={parent_id}></CreateFolder>
                        <UploadDocument parent_id={parent_id}></UploadDocument>
                    </div> */}
                    </div> : null
                }

                <div className="folders">
                    {
                        folders?.length > 0 ? (
                            folders?.map((val, index) => {
                                return (
                                    <div className="folder" key={index}>
                                        <div className="folder_img">
                                            <img src={folderImg} alt="" />
                                        </div>
                                        <div className="folder_name">
                                            <NavLink className="navlink" to={`/${val.unique_id}`}><span>{val.folder_name}</span></NavLink>
                                        </div>
                                        <div className="dots" onClick={() => toggleFolderDropdown(index)}>
                                            <div className='single-dot'></div>
                                            <div className='single-dot'></div>
                                            <div className='single-dot'></div>
                                        </div>
                                        {openFolderDropdown === index && (
                                            <div className="folder-dropdown-content">
                                                <NavLink className="folder-dropdown-menu" to="#" onClick={() => handleDeleteFolder(val.unique_id)}>Delete</NavLink>
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        ) : null
                    }
                </div>

                <div className="dashboard-files">
                    {docData?.length > 0 ?
                        <div className="dashboard-title" style={{ marginTop: "16px" }}>
                            <h3>Files</h3>
                        </div> : null
                    }

                    <div className="dashboard-main">
                        {
                            docData?.length > 0 ? (
                                docData?.map((val, index) => {
                                    const filePath = returnImage(val);
                                    return (
                                        <div className="dashboard-file" key={index}>
                                            <div className="file-header">
                                                <p className='file-name'>{val.originalname}</p>
                                                <div className="dots" onClick={() => toggleDropdown(index)}>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                    <div className='single-dot'></div>
                                                </div>
                                                {openFileDropdown === index && (
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
                            ) : !folders.length > 0 ? (
                                <div>NO DATA FOUND</div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard