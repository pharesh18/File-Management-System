import axios from 'axios';
import { toast } from 'react-toastify';
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const createFolder = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post("http://localhost:8000/api/folder/create", body, { headers });
        if (!data.error) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
}

export const getFolders = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post("http://localhost:8000/api/folder/get", body, { headers });
        if (!data.error) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
}
