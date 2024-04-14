const express = require('express');
const router = express.Router();
const { validateUserSchema, registerUser, validateOtpSchema, userOtp, validateUserLogin, userLogin, validateForgetPassword, forgetPassword, validateChangePassword, changePassword, uploadProfile, validateUploadProfile, upload, getAllUsers } = require('../controller/userController.js');

router.post('/register', upload.single('profile'), validateUserSchema, registerUser);
// router.post('/register', upload.single('profile'), registerUser);
router.post('/otp', validateOtpSchema, userOtp);
router.post('/login', validateUserLogin, userLogin);
router.post('/forgetpassword', validateForgetPassword, forgetPassword);
// router.post('/verifypass', validateVerifyPassword, verifyPassword);
router.post('/changepassword', validateChangePassword, changePassword);
router.post('/uploadprofile', upload.single('profile'), validateUploadProfile, uploadProfile);
router.get('/getAll', getAllUsers);

module.exports = router;