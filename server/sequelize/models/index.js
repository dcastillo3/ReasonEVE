const Track = require('./track');
const Artist = require('./artist');
const Product = require('./product');
const MediaFile = require('./mediaFile');
const AdditionalArtist = require('./additionalArtist');
const ProductType = require('./productType');
const S3Key = require('./s3Key');
const PurchaseType = require('./purchaseType');
const ProductPricing = require('./productPricing');

// Track associations
Track.hasOne(Product);

// Product associations
Product.belongsTo(ProductType);
Product.belongsTo(Track);
Product.belongsTo(Artist);
Product.hasMany(AdditionalArtist);
Product.hasOne(MediaFile);
Product.hasMany(S3Key);
Product.hasMany(ProductPricing);

// ProductType associations
ProductType.hasMany(Product);

// MediaFile associations
MediaFile.belongsTo(Product);

// S3Key associations
S3Key.belongsTo(Product);
S3Key.belongsTo(PurchaseType);

// PurchaseType associations
PurchaseType.hasMany(S3Key);
PurchaseType.hasMany(ProductPricing);

// ProductPricing associations
ProductPricing.belongsTo(Product);
ProductPricing.belongsTo(PurchaseType);

// AdditionalArtist associations
AdditionalArtist.belongsTo(Artist);
AdditionalArtist.belongsTo(Product);

module.exports = {
    Track,
    Artist,
    Product,
    MediaFile,
    AdditionalArtist,
    ProductType,
    S3Key,
    PurchaseType,
    ProductPricing
};