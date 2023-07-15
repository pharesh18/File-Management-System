import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { shareFile } from '../../Actions/docAction';

const ShareFile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        window.history.back();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            from: location.state.email,
            to: e.target.email.value,
            subject: e.target.subject.value,
            text: e.target.description.value,
            fname: location.state.fname
        }
        console.log(body);
        shareFile(body, navigate);
    }

    return (
        <>
            <div className="register">
                <div className="background">
                    <div className="regist">
                        <form onSubmit={handleSubmit}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Share file</h2>
                            <div className="regist-col">
                                <label className="regist-label">To</label>
                                <input type="email" className="regist-input" name="email" placeholder="Enter email" required></input>
                            </div>

                            <div className="regist-col">
                                <label className="regist-label">Subject</label>
                                <input type="text" className="regist-input" name="subject" placeholder="Enter subject" required></input>
                            </div>

                            <div className="regist-col">
                                <label className="regist-label">Text</label>
                                <textarea style={{ height: "150px", fontSize: "16px" }} className="regist-input" name="description" placeholder="Enter description" required></textarea>
                            </div>

                            <div className="buttons">
                                <button type="submit" className="regist-button">
                                    Submit
                                </button>
                                <button className="regist-button" type="button" onClick={handleBack}>
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default ShareFile