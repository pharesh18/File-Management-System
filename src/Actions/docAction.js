import axios from "axios";
import { toast } from "react-toastify";
import fileImg from '../images/gmail1.jpg';
import ApiCaller from "../apiCaller/ApiCaller";

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const uploadDoc = async (files) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post(`${ApiCaller.site}/doc/upload`, files, { headers });
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


export const downloadFile = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post(`${ApiCaller.site}/doc/download`, body, { headers });
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

export const deleteFile = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post(`${ApiCaller.site}/doc/delete`, body, { headers });
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

export const restoreFile = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post(`${ApiCaller.site}/doc/bin/restore`, body, { headers });
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

export const restoreAll = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.get(`${ApiCaller.site}/doc/bin/restoreall`, { headers });
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


export const deletePermanent = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.post(`${ApiCaller.site}/doc/bin/delete`, body, { headers });
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

export const deleteAllPermanent = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            _id: userInfo._id,
            accesstoken: userInfo.accesstoken
        };

        const { data } = await axios.get(`${ApiCaller.site}/doc/bin/deleteall`, { headers });
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



// export const getDocs = async (files) => {
//     try {
//         const headers = {
//             'Content-Type': 'application/json',
//             _id: userInfo._id,
//             accesstoken: userInfo.accesstoken
//         };
//         const { data } = await axios.get(`${ApiCaller.site}/doc/getdocs`, { headers });
//         if (data.error) {
//             toast.error(data.message);
//         } else {
//             return data;
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }


export const shareFile = async (boddf, navigate) => {
    const email = "hp452444@gmail.com";
    const subject = "My Subject";
    const body = "My Message";
    // const attachment = "path/to/file.pdf";
    // const from = "hmp24040@gmail.com";
    const to = email;
    // const imgName = "1688303726907_MC.pdf"

    // const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&subject=${subject}&body=${body}&attach=${fileImg}`;
    // const url = `https://mail.google.com/mail/?view=cm&fs=1&attach=${fileImg}`;
    const file = new File([fileImg], 'gmail1.jpg', { type: 'image/jpeg' });
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&subject=${subject}&body=${body}&attach=${file}`;
    window.location.href = url;

    // const email = "hmp24040@gmail.com";
    // const subject = "My Subject";
    // const body = "My Message";
    // // const attachment = fileImg;

    // const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&subject=${subject}&body=${body}&attach=${fileImg}`;
    // window.location.href = url;
    // try {
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         _id: userInfo._id,
    //         accesstoken: userInfo.accesstoken
    //     };

    //     const { data } = await axios.post(`${ApiCaller.site}/doc/share/gmail`, body, { headers });
    //     // console.log(data);
    //     if (!data.error) {
    //         // toast.success(data.message);
    //         window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Subject&body=Body&attid=0.1&disp=safe&zw&attach=${encodeURIComponent(fileImg)}`;
    //     } else {
    //         // toast.error(data.message);
    //         console.log(data);
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
}
