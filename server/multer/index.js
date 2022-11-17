const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const storageConfigs = {
    track: {
        nameField: 'trackName',
        folderPath: '../../tracks',
        uploadFields: [
            { 
                name: 'track', 
                maxCount: 1 
            }, 
            { 
                name: 'coverArt', 
                maxCount: 1 
            }
        ]
    },
    pack: {
        nameField: 'packName',
        folderPath: '../../packs',
        uploadFields: [
            { 
                name: 'pack', 
                maxCount: 1 
            }, 
            { 
                name: 'coverArt', 
                maxCount: 1 
            }
        ]
    }
};

const storageClient = (product) => {
    try {
        const {
            nameField,
            folderPath,
            uploadFields
        } = storageConfigs[product];

        // /addTrack upload destination and fields to upload
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const productName = req.body[nameField];
                const newProductPath = path.join(__dirname, folderPath, productName);

                //Make new directory if doesn't exist
                !fs.existsSync(newProductPath) && fs.mkdirSync(newProductPath);

                cb(null, newProductPath);
            },
            filename: (req, file, cb) => {
                const productName = req.body[nameField];
                const extension = path.extname(file.originalname);
                const fileName = `${productName}${extension}`;

                cb(null, fileName);
            }
        });

        const upload = multer({ storage });
        const productUpload = upload.fields(uploadFields);

        return productUpload;
        
    } catch (error) {
        throw(error);
    }
};

module.exports = storageClient;