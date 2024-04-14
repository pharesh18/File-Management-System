import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ApiCaller from '../../apiCaller/ApiCaller';
import { toast } from 'react-toastify';

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


const AdminMainData = () => {
    const [users, setUsers] = useState([]);
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const getAllUsers = async () => {
        const headers = {
            'Content-Type': 'Application/json',
            _id: userInfo?._id,
            accesstoken: userInfo?.accesstoken
        };

        axios.get(`${ApiCaller.site}/users/getAll`, { headers }).then(({ data }) => {
            if (!data.error) {
                setUsers(data.data);
                console.log(data.data)
            } else {
                toast.error(data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <>
            {
                users?.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#000" }}>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "600", color: "#fff" }}>Name</TableCell>
                                    <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Email</TableCell>
                                    <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Profile Name</TableCell>
                                    <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Is Verified</TableCell>
                                    <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Is Admin</TableCell>
                                </TableRow>
                            </TableHead>

                            {users.map((user) => {
                                return (
                                    <TableBody>
                                        <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row"> {`${user.fname} ${user.lname}`}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left">{user?.profile?.split('_')[1]}</TableCell>
                                            {/* <TableCell align="left">{user.profile}</TableCell> */}
                                            <TableCell align="left">{user.is_verified ? 'True' : 'False'}</TableCell>
                                            <TableCell align="left">{user.is_admin ? 'True' : 'False'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                )
                            })}

                        </Table>
                    </TableContainer>


                    // users?.map((user) => {
                    //     return (
                    //         <>
                    //             <TableContainer key={user._id} component={Paper}>
                    //                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    //                     <TableHead style={{ backgroundColor: "#000" }}>
                    //                         <TableRow>
                    //                             <TableCell style={{ fontWeight: "600", color: "#fff" }}>Name</TableCell>
                    //                             <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Email</TableCell>
                    //                             <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Profile Name</TableCell>
                    //                             <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Is Verified</TableCell>
                    //                             <TableCell style={{ fontWeight: "600", color: "#fff" }} align="left">Is Admin</TableCell>
                    //                         </TableRow>
                    //                     </TableHead>
                    //                     <TableBody>
                    //                         <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    //                             <TableCell component="th" scope="row"> {`${user.fname} ${user.lname}`}</TableCell>
                    //                             <TableCell align="left">{user.email}</TableCell>
                    //                             <TableCell align="left">{user.profile.split('_')[1]}</TableCell>
                    //                             <TableCell align="left">{user.is_verified ? 'True' : 'False'}</TableCell>
                    //                             <TableCell align="left">{user.is_admin ? 'True' : 'False'}</TableCell>
                    //                         </TableRow>
                    //                     </TableBody>
                    //                 </Table>
                    //             </TableContainer>
                    //         </>
                    //     )
                    // })
                ) : (
                    <>
                        <div>No Data Found</div>
                    </>
                )
            }
        </>
    )
}

export default AdminMainData