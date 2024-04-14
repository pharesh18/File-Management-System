import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../Actions/userAction';
import '../../css/pages/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        let body = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        login(body, navigate);
    }
    return (
        <>
            <div className='login'>
                <div className="background">
                    <div className="log">
                        <form onSubmit={handleLogin}>
                            <div className="regist-col">
                                <label className="regist-label">Email address</label>
                                <input type="email" className="regist-input" placeholder="Enter email" name="email" required></input>
                                {/* <label style={{ fontSize: '13px', color: 'rgb(120, 120, 121)', marginTop: '3px' }} class="text-muted">We'll never share your email with anyone else.</label> */}
                            </div>

                            <div className="regist-col">
                                <label className="regist-label">Password</label>
                                <input type="password" className="regist-input" placeholder="Enter Password" minLength={3} maxLength={10} name="password" required></input>
                            </div>

                            <div className="links" style={{ marginBottom: "20px" }}>
                                <div className="regist-col"><label className="regiter"><NavLink to="/forgetpassword" style={{ fontSize: "85%", textDecoration: "none", visibility: "hidden" }}>Forget Password ?</NavLink></label> </div>
                                <div className="regist-col"><label className="regiter"><Link to="/register" style={{ fontSize: "85%", textDecoration: "none" }}>New On This Site ?</Link></label> </div>
                            </div>
                            <button className="regist-button" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

