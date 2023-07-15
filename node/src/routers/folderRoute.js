const express = require('express');
const { createFolder, getFolders } = require('../controller/folderController');
const router = express.Router();

router.post('/create', createFolder);
router.post('/get', getFolders);

module.exports = router;