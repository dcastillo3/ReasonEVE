const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const { storageConfigs } = require('../utils/consts');

const storageClient = productType => {
    try {
        const {
            localPath,
            uploadFields
        } = storageConfigs[productType];

        // /addTrack upload destination and fields to upload
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const { productName } = req.body;
                const newProductPath = path.join(localPath, productName);

                //Make new directory if doesn't exist
                !fs.existsSync(newProductPath) && fs.mkdirSync(newProductPath);

                cb(null, newProductPath);
            },
            filename: (req, file, cb) => {
                const { productName } = req.body;
                const extension = path.extname(file.originalname);
                const fileName = `${productName}${extension}`;

                cb(null, fileName);
            }
        });

        const upload = multer({ storage });
        const productUpload = upload.fields(uploadFields);

        return productUpload;
        
    } catch (err) {
        throw(err);
    };
};

module.exports = storageClient;