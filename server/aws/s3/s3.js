const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { clientParams } = require('../awsConsts');
const { signedUrlParams } = require('./s3Consts');
const { serviceLog } = require('../../utils/utils');
const { services } = require('../../utils/consts');

const s3Client = new S3Client(clientParams);

const uploadS3Product = async (key, file, fileName) => {
    const s3CommandParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file,
    };
    const s3Command = new PutObjectCommand(s3CommandParams);
    const response = await s3Client.send(s3Command);

    serviceLog(services.AWSS3, `Uploaded ${fileName}`);

    return response;
};

const buildSignedUrl = async (key, productName, purchaseType) => {
    const s3CommandParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key
    };
    const s3Command = new GetObjectCommand(s3CommandParams);
    const signedUrl = await getSignedUrl(s3Client, s3Command, signedUrlParams);

    serviceLog(services.s3, `Fetched signed url for ${productName} | ${purchaseType}`);

    return signedUrl;
};

module.exports = {
    uploadS3Product,
    buildSignedUrl
};