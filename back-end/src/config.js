
const config = {
    /*
    * Port running application
    */
    PORT: 3000,
    /*
    * Sometime we need prefix in link to defined API link and other link.
    * Structure: domain.com/[route_prefix]/...
    * Example: http://domain.com/api/user
    */
    ROUTE_PREFIX: 'api',

    /*
    * Sometime we need prefix in link to defined CMS API link and other link.
    * Structure: domain.com/[cms_route_prefix]/[route_prefix]/...
    * Example: http://domain.com/api/user
    */
    CMS_ROUTE_PREFIX: 'cms',
    /*
    * Security configure
    */
    JWT_SECRET_KEY: "CEH@FMAFMJ@234824$%#Q%@!##",
    PASSWORD_SCERET_KEY: "AQ!@(!NFAJF*((!@#*(R)!U__*#",
    /**
     * Allowed Extension File
     */
    ALLOWED_EXTENSION_FILE:  [
        '.png',
        '.jpg',
        '.mp4',
        '.mov'
    ],
    /**
     * Google Place API Token
     */
    GG_PLACE_API_TOKEN: "AIzaSyCr7wZCqm1HbjMmBnMQVEJ469IMbOBunS0",
    /**
     * Google Storage Bucket Name
     */
    GG_BUCKET_NAME: 'tick-me-82348.appspot.com',
    GG_LINK_STORAGE: 'https://firebasestorage.googleapis.com/v0/b/tick-me-82348.appspot.com/o/',
    /**
     * Suffix config for image name
     */
    SUFFIX_THUMBNAIL: '_thumb',
    SUFFIX_SMALL: '_small',
    /*
    * Database configure
    */
    DB_HOST: 'cluster0-d2wik.mongodb.net',
    DB_PORT: 27017,
    DB_USERNAME: 'dbTickME',
    DB_PASSWORD: 'WNayd0iXgiYVZy1o',
    DB_NAME: process.env.NODE_ENV == 'test' ? 'tick-me-test' : 'tick-me',
};

export default config;

const MONGODB_CONNECTION_DEV = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
const MONGODB_CONNECTION_PROD = `mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}?authSource=admin`;

const MONGODB_CONNECTION_RMDB = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0-d2wik.mongodb.net/${config.DB_NAME}?authSource=admin&retryWrites=true&w=majority`;

let connectionString = MONGODB_CONNECTION_RMDB;

// if (process.env.NODE_ENV == 'production') {
//     connectionString = MONGODB_CONNECTION_PROD;
// }
// else if (process.env.NODE_ENV == 'remotedb')
//     connectionString = MONGODB_CONNECTION_RMDB;
// else
//     connectionString = MONGODB_CONNECTION_DEV;

console.log("=> Using connection string: ", connectionString);

export const MONGODB_CONNECTION_STRING = connectionString;

/**
 * CMS configuaration
 */

export const cmsConfig = {
    JWT_SECRET_KEY: "!@#!#!DSBADB&Q@#HD^Q@*!",
 };