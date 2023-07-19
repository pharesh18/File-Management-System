const express = require('express');
const { createFolder, getFolders, deleteFolder } = require('../controller/folderController');
const router = express.Router();

router.post('/create', createFolder);
router.post('/get', getFolders);
router.post('/delete', deleteFolder);

module.exports = router;