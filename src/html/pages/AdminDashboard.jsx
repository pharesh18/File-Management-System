import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminMainData from '../components/AdminMainData';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const AdminDashboard = ({ searchInput, setDataFromChild }) => {
    return (
        <>
            <div className='dashboard'>
                <AdminMainData></AdminMainData>
            </div>
        </>
    )
}

export default AdminDashboard