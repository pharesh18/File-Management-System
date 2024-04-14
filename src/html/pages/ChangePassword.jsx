import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { changePassword } from '../../Actions/userAction';

const ChangePassword = () => {
    const [password, setPassword] = useState(null);
    const [npassword, setnPassword] = useState(null);
    const [cpassword, setcPassword] = useState(null);

    const navigate = useNavigate();

    const handleBack = () => {
        window.history.back();
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        const body = {
            password: password,
            npassword: npassword
        }
        changePassword(body, navigate);
    }
    return (
        <div className="register">
            <div className="background">
                <div className="regist">
                    <form onSubmit={handleChangePassword}>
                        <div className="regist-col">
                            <label className="regist-label">Current Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="regist-input" name="password" placeholder="Enter Current Password" minLength={3} maxLength={10} required></input>
                        </div>

                        <div className="regist-col">
                            <label className="regist-label">New Password</label>
                            <input type="password" value={npassword} onChange={(e) => setnPassword(e.target.value)} className="regist-input" name="npassword" placeholder="Enter New Password" minLength={3} maxLength={10} required></input>
                        </div>

                        <div className="regist-col">
                            <label className="regist-label">Confirm Password</label>
                            <input type="password" value={cpassword} onChange={(e) => setcPassword(e.target.value)} className="regist-input" placeholder="Enter Confirm Password" id="comform" required></input>
                            {npassword !== cpassword ? <span className="password-caution"> password doesn't matched</span> : null}
                        </div>

                        <div className="regist-col"><label className="regiter"><NavLink to="/forgetpassword" style={{ fontSize: "85%", textDecoration: "none", visibility: "hidden" }}>Forget Password?</NavLink></label> </div>

                        <div className="buttons">
                            <button type="submit" className="regist-button" disabled={npassword === cpassword ? false : true}>
                                Change Password
                            </button>
                            <button className="regist-button" type="button" onClick={handleBack}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword