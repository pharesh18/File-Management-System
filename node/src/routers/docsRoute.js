const express = require('express');
const router = express.Router();
const { validateUploadDocs, uploadDocs, upload, getDocument, shareDocument } = require('../controller/uploadDocsController.js');

router.post('/upload', upload.array('files'), validateUploadDocs, uploadDocs);
router.get('/getdocs', getDocument);
router.post('/share/gmail', shareDocument);

module.exports = router;