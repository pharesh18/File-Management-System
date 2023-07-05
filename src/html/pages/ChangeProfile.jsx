import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { changeProfile } from '../../Actions/userAction';

const ChangeProfile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const handleProfile = (e) => {
        const uploadedFile = e.target.files[0]
        setProfile(uploadedFile);
    }


    const handleBack = () => {
        window.history.back();
    }

    const handleChangeProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile', profile);
        changeProfile(formData, navigate);
    }

    return (
        <>
            <div className='login'>
                <div className="background">
                    <div className="log">
                        <form onSubmit={handleChangeProfile}>
                            <h2 className='profile-title'>Update Profile</h2>
                            <div className="regist-col">
                                {/* <label className="regist-label">Select profile</label> */}
                                <input type="file" className='regist-input' onChange={handleProfile} required />
                            </div>
                            <div className="buttons">
                                <button className="regist-button" type="submit">
                                    Update Profile
                                </button>
                                <button className="regist-button" type="button" onClick={handleBack}>
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeProfile