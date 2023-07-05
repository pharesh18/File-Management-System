import React from 'react';

const FilePreview = ({ fileUrl }) => {
    const handlePreview = () => {
        window.open(fileUrl, '_blank');
    };

    const getFileExtension = () => {
        const extension = fileUrl.split('.').pop();
        return extension.toLowerCase();
    };

    const shouldUseGoogleDocsViewer = () => {
        const extension = getFileExtension();
        return ['docx', 'pptx'].includes(extension);
    };

    const renderFilePreview = () => {
        if (shouldUseGoogleDocsViewer()) {
            const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
                fileUrl
            )}`;
            return (
                <button onClick={() => window.open(googleDocsViewerUrl, '_blank')}>
                    Preview File
                </button>
            );
        } else {
            return (
                <button onClick={handlePreview}>
                    Preview File
                </button>
            );
        }
    };

    return <div>{renderFilePreview()}</div>;
};

export default FilePreview;
