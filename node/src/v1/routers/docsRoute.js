const express = require('express');
const router = express.Router();
const { validateUploadDocs, uploadDocs, upload, getDocument, shareDocument, downloadFile, getBin, deleteFile, restoreFile, deletePermanent, deleteAllPermanent, restoreAll, recentData, previewDOCX } = require('../controller/uploadDocsController.js');

router.post('/upload', upload.array('files'), validateUploadDocs, uploadDocs);
router.post('/getdocs', getDocument);
router.post('/preview/docx', previewDOCX)
router.post('/share/gmail', shareDocument);
router.post('/download', downloadFile);
router.post('/delete', deleteFile);
router.post('/bin/get', getBin);
router.post('/bin/restore', restoreFile);
router.get('/bin/restoreall', restoreAll);
router.post('/bin/delete', deletePermanent);
router.get('/bin/deleteall', deleteAllPermanent);
router.post('/recent/get', recentData);

module.exports = router;