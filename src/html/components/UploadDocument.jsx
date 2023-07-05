import React, { useState } from 'react'
import { uploadDoc } from '../../Actions/docAction'

const UploadDocument = () => {


    const handleUpload = (e) => {
        const files = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        uploadDoc(formData);
    }


    // const [selectedFiles, setSelectedFiles] = useState([]);

    // const handleUpload = async (e) => {
    //     setSelectedFiles([...e.target.files]);
    //     await 
    //     if (selectedFiles) {
    //         const formData = new FormData();

    //         selectedFiles.forEach((file, index) => {
    //             formData.append(`file${index}`, file);
    //         });

    //         setTimeout(() => {
    //             uploadDoc(formData);
    //         }, 5000);
    //     }
    // }
    return (
        <>
            <input type="file" multiple id="Documents" name="document" style={{ display: "none" }} onChange={handleUpload} />
            <label htmlFor="Documents">
                <div className="file">
                    <span className="plus">+</span>
                    <span>upload file</span>
                </div>
            </label>
        </>
    )
}

export default UploadDocument