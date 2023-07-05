import axios from "axios";
import { toast } from "react-toastify";
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const uploadDoc = async (files) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post("http://localhost:8000/api/doc/upload", files, { headers });
        console.log(data);
        if (!data.error) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
}


export const getDocs = async (files) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };
        const { data } = await axios.get("http://localhost:8000/api/doc/getdocs", { headers });
        if (data.error) {
            toast.error(data.message);
        } else {
            return data;
        }
    } catch (err) {
        console.log(err);
    }
}

export const shareFile = async (body, navigate) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post("http://localhost:8000/api/doc/share/gmail", body, { headers });
        if (!data.error) {
            toast.success(data.message);
            navigate('/')
        } else {
            toast.error(data.message);
        }
    } catch (err) {
        console.log(err);
    }
}
