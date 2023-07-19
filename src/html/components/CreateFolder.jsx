import React, { useState } from 'react';
import { createFolder } from '../../Actions/folderAction';

const CreateFolder = ({ parent_id, uploadFolder, setUploadFolder }) => {
    const [folderName, setFolderName] = useState()

    const handleChange = (e) => {
        e.preventDefault();
        setFolderName(e.target.value);
    }

    const handleCreate = () => {
        const open = document.querySelector(".create-folder");
        open.style.display = "block";
    }

    const handleClose = () => {
        const close = document.querySelector(".create-folder");
        close.style.display = "none";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            folder_name: folderName,
            parent_id: parent_id
        }
        createFolder(body);
        setTimeout(() => {
            setUploadFolder(!uploadFolder);
        }, 1000)
        setFolderName("");
        const close = document.querySelector(".create-folder");
        close.style.display = "none";
    }

    return (
        <>
            <div className="folder" onClick={handleCreate}>
                <span className="plus">+</span>
                <span>create folder</span>
            </div>

            <div className="create-folder">
                <div className='create-popup'>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="create-header">
                            <h2>Create folder</h2>
                        </div>
                        <div className="create-input">
                            <input type="text" placeholder='Enter folder name' value={folderName} onChange={handleChange} required />
                        </div>
                        <div className="create-buttons">
                            <button className='regist-button' type='submit'>Create</button>
                            <button className='regist-button' onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateFolder