import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/pages/Dashboard.css';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import gmailImg from '../../images/gmail1.jpg';
// import folderImg from '../../images/folder.png';
import textImg from '../../images/txt.png';
import pdfImg from '../../images/pdff.png';
import fileImg from '../../images/file.png';
import { deleteAllPermanent, deletePermanent, restoreAll, restoreFile } from '../../Actions/docAction';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const Bin = ({ searchInput, setDataFromChild }) => {
    const { parent_id } = useParams();
    setDataFromChild(parent_id);

    const [openFileDropdown, setOpenFileDropdown] = useState(null);
    const [docData, setDocData] = useState([]);

    const toggleDropdown = (index) => {
        if (openFileDropdown === index) {
            setOpenFileDropdown(null); // Close the dropdown if already open
        } else {
            setOpenFileDropdown(index); // Open the dropdown of the clicked card
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
            const { data } = await axios.post("http://localhost:8000/api/doc/bin/get", body, { headers });
            if (data.error) {
                toast.error(data.message);
            } else {
                setDocData(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleRestore = (filename) => {
        const body = {
            filename: filename
        }
        setTimeout(() => {
            getDocs();
        }, 1000)
        restoreFile(body);
    }

    const handleRestoreAll = () => {
        setTimeout(() => {
            getDocs();
        }, 1000)
        restoreAll();
    }

    const handlePermanentDelete = (filename) => {
        const body = {
            filename: filename
        }
        setTimeout(() => {
            getDocs();
        }, 1000)
        deletePermanent(body);
    }

    const handleDeleteAllPermanent = () => {
        setTimeout(() => {
            getDocs();
        }, 1000)
        deleteAllPermanent();
    }

    useEffect(() => {
        getDocs();
    }, [parent_id, searchInput]);

    return (
        <>
            <div className='dashboard'>
                <div className="dashboard-files">
                    {docData?.length > 0 ?
                        <div className="dashboard-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                            <h3>Files</h3>
                            <div className="bin-buttons">
                                <button onClick={handleRestoreAll} style={{ padding: "8px 14px", fontWeight: "500", background: "rgba(30, 53, 184, 0.842)", color: "#fff", border: "none", outline: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>Restore All</button>
                                <button onClick={handleDeleteAllPermanent} style={{ padding: "8px 14px", fontWeight: "500", background: "rgba(30, 53, 184, 0.842)", color: "#fff", border: "none", outline: "none", borderRadius: "4px", cursor: "pointer" }}>Delete All</button>
                            </div>
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
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handleRestore(val.filename)}>Restore</NavLink>
                                                        <NavLink className="file-dropdown-menu" to="#" onClick={() => handlePermanentDelete(val.filename)}>Delete</NavLink>
                                                    </div>
                                                )}
                                            </div>
                                            <img className='dashboard-file-image' src={filePath} onClick={() => { handlePreview(`http://localhost:8000/public/documents/${val.filename}`) }} alt="" />
                                        </div>
                                    )
                                })
                            ) : (
                                <div>NO DELETED FILES FOUND</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bin