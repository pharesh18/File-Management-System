import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { verifyOtp } from '../../Actions/userAction';
import imgclip from '../../images/otpclip.png';

const Otp = () => {
    const [Otp, setOtp] = useState(new Array(4).fill(""));
    const { email } = useParams();
    const navigate = useNavigate();

    // for otp inputs
    const handleChange = (element, index) => {
        if (isNaN(element.value))
            return false;
        else if (element.value.key === 8) {
            element.previousSibling.focus();
        }
        setOtp([...Otp.map((d, idx) => (idx === index) ? element.value : d)]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    }

    const handleClear = (e) => {
        e.preventDefault();
        setOtp([...Otp.map(v => "")]);
    }

    const handleOtp = (e) => {
        e.preventDefault();
        let otp = e.target[0].value + e.target[1].value + e.target[2].value + e.target[3].value;
        let body = {
            otp: otp,
            email: email,
        }
        console.log(body);
        verifyOtp(body, navigate);
    }

    return (
        <>
            <div className='otp-main'>
                <div className="otpcontainer">
                    <img src={imgclip} alt="otp" className="otp-img" />
                    <h5 className="otp-title">Otp Verification</h5>
                    <p className="yourmail">OTP sent on your Email@gmail.com</p>
                    <form onSubmit={handleOtp}>
                        <div className="otp">
                            <div className="otp-inputs">
                                {Otp.map((data, index) => {
                                    return (
                                        <input
                                            type="text"
                                            maxLength={1}
                                            name="otp"
                                            key={index}
                                            value={data}
                                            onChange={e => handleChange(e.target, index)}
                                            onKeyDown={e => e.target.select()}
                                        />
                                    );
                                })}
                            </div>

                            <p className="resend" style={{ visibility: "hidden" }}>Didn't recieved otp ?  <span className="re"> Resend</span></p>
                            <div className="otp-btns">
                                <button className="clear-button" onClick={handleClear}>Clear</button>
                                <button className="verify-button" type="submit">verify</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Otp