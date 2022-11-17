const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

// Read packs directory and generate pack data
router.get('/getPacks', (req, res) => {
    try {
        const playlist = [];
        const packsPath = path.join(__dirname, '../../packs');
        const packFolders = fs.readdirSync(packsPath);
        const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/packs';

        packFolders.forEach((packFolder, id) => {
            const packPath = path.join(packsPath, packFolder);
            const packFiles = fs.readdirSync(packPath);
            let packData = {};

            if (packFiles.length) {
                packFiles.forEach(file => {
                    const fileName = path.parse(file).name;
                    const extension = path.extname(file);

                    if (extension === '.mp3') {
                        packData = {
                            ...packData,
                            id,
                            title: fileName,
                            artist: 'ReasonEVE',
                            url: `${cdnBaseUrl}/${fileName}/${file}`
                        };
                    } else {
                        packData = {
                            ...packData,
                            coverArt: `${cdnBaseUrl}/${fileName}/${file}`,
                        };
                    };
                });
            };

            playlist.push(packData);
        });

        res.send(playlist);
    } catch (error) {
        throw (error);
    };
});

// /addPack upload destination and fields to upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { packName } = req.body;
        const newPackPath = path.join(__dirname, '../../packs', packName);

        //Make new directory if doesn't exist
        !fs.existsSync(newPackPath) && fs.mkdirSync(newPackPath);

        cb(null, newPackPath);
    },
    filename: (req, file, cb) => {
        const { packName } = req.body;
        const extension = path.extname(file.originalname);
        const fileName = `${packName}${extension}`;

        cb(null, fileName);
    }
});
const upload = multer({ storage });
const packUpload = upload.fields([{ name: 'pack', maxCount: 1 }, { name: 'coverArt', maxCount: 1 }]);

// Add to packs directory
router.post('/addPack', packUpload, (req, res) => {
    res.send({
        success: true,
        message: 'Pack added successfully'
    });
});

module.exports = router;