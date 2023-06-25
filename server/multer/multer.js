const multer  = require('multer');
const { storageConfigs } = require('../utils/consts');
const { formatUploadFieldsForMulter } = require('../utils/productUtils');

const storageClient = productType => {
    try {
        const { uploadFields } = storageConfigs[productType];
        const formattedUploadFields = formatUploadFieldsForMulter(uploadFields);
        const storage = multer.memoryStorage();

        const upload = multer({ storage });
        const productUpload = upload.fields(formattedUploadFields);

        return productUpload;
    } catch (err) {
        console.error(err);
    };
};

module.exports = storageClient;