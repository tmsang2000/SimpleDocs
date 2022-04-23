import path from 'path';
import _ from 'lodash';
import config from '../config';
import fs from 'fs-extra';
import thumbnail from 'node-thumbnail';
import ThumbnailGenerator from 'video-thumbnail-generator';
import VideoDimensions from 'get-video-dimensions';
// import * as GoogleStorageService from './storage.service';

const SERVER_UPLOAD = `./upload`;
fs.ensureDirSync(SERVER_UPLOAD);

// export function uploadImage(req, res, next) {
//     if(req.files === null) {
//         return res.status(400).send({error: 'No files were uploaded.'});
//     }

//     if (Object.keys(req.files).length == 0) {
//         return res.status(400).send({error: 'No files were uploaded.'});
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let media = req.files.media;
//     let fileExtension = getFileExtension(media.name);
//     let dir = 'upload';
//     let fileName = generateFileName();

//     if(validExtension(fileExtension)) {
//         //define uploaded file name
//         let newFileName = `${fileName}${fileExtension}`;
//         let newThumbnailFileName = `${fileName}${config.SUFFIX_THUMBNAIL}${fileExtension}`;
//         let newSmallFileName = `${fileName}${config.SUFFIX_SMALL}${fileExtension}`;

//         //define source
//         let rootUpload = `./${dir}`;
//         let serverFilePath = `/${dir}/${newFileName}`;
//         let serverThumbnailPath = `/${dir}/${newThumbnailFileName}`;
//         let serverSmallPath = `/${dir}/${newSmallFileName}`;
//         let image_link = config.GG_LINK_STORAGE;
        
//         // Use the mv() method to place the file somewhere on your server
//         media.mv('.' + serverFilePath, (err) => {
//             if (err) {
//                 res.status(500).send(err);
//             }
//             else {
//                 let typeFile = getTypeFile(media.mimetype);

//                 //upload original image
//                 uploadToGoogleStorage('./' + serverFilePath, newFileName).then(data => {
//                     console.log(data);
//                 }).catch(err => console.log(err));

//                 //setting link upload
//                 req.fileUploaded = {
//                     type: typeFile, 
//                     path: `${image_link}${newFileName}?alt=media`,
//                     thumbnailPath: `${image_link}${newThumbnailFileName}?alt=media`,
//                     smallPath: `${image_link}${newSmallFileName}?alt=media`,
//                     size: media.size,
//                 };

//                 if(typeFile == 'image') {
//                     Promise.all( [
//                         thumbnail.thumb({
//                             source: `.${serverFilePath}`,
//                             suffix: config.SUFFIX_THUMBNAIL, 
//                             destination: `${rootUpload}`,
//                             width: 480
//                         }),

//                         thumbnail.thumb({
//                             source: `.${serverFilePath}`,
//                             suffix: config.SUFFIX_SMALL, 
//                             destination: `${rootUpload}`,
//                             width: 220
//                         }),
//                     ]).then(data => {
//                         //upload thumbnail image
//                         uploadToGoogleStorage('./' + serverThumbnailPath, newThumbnailFileName).then(data => {
//                             //delete old file inserver
//                             fs.unlink('./' + serverThumbnailPath, (error) => { error || console.log(error) });
//                         }).catch(err => console.log(err));

//                         //upload small image
//                         uploadToGoogleStorage('./' + serverSmallPath, newSmallFileName).then(data => {
//                             //delete old file inserver
//                             fs.unlink('./' + serverSmallPath, (error) => { error || console.log(error) });
//                             fs.unlink('./' + serverFilePath, (error) => { error || console.log(error) });
//                         }).catch(err => console.log(err));

//                         next();
//                     }).catch(err => {
//                         res.status(500).send(err.toString());
//                     });
//                 }
//                 else { res.status(500).send({error: "Unknown file type."}); }
//             }
//         });
//     }
//     else { res.status(403).send({error: `Just allowed upload file type: ${ _.toString(config.ALLOWED_EXTENSION_FILE)}`}); }
// }

export function uploadImageIntoServer (req, res, next) {
    if(req.files === null) {
        return res.status(400).send({error: 'No files were uploaded.'});
    }

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send({error: 'No files were uploaded.'});
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let media = req.files.media;
    let fileExtension = getFileExtension(media.name);
    let dir = 'upload';
    

    if(validExtension(fileExtension)) {
        let newFileName = `${generateFileName()}${fileExtension}`;
        let serverFilePath = `/${dir}/${newFileName}`;
        let serverThumbnailPath = `./${dir}/thumbnail`;
        let serverSmallPath = `./${dir}/small`;

        if (!fs.existsSync(serverSmallPath)){
            fs.mkdirSync(serverSmallPath);
        }
        
        // Use the mv() method to place the file somewhere on your server
        media.mv('.' + serverFilePath, (err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {        
                let typeFile = getTypeFile(media.mimetype);
                req.fileUploaded = {
                    type: typeFile, 
                    path: serverFilePath,
                    thumbnailPath: serverFilePath,
                    smallPath: serverFilePath,
                    size: media.size,
                };
                
                if(typeFile == 'image') {
                    let serverThumbnailFilePath = `/${dir}/thumbnail/${newFileName}`;
                    let serverSmallFilePath = `/${dir}/small/${newFileName}`;

                    Promise.all( [
                        thumbnail.thumb({
                            source: `.${serverFilePath}`,
                            suffix: '', 
                            destination: `${serverThumbnailPath}`,
                            width: 480
                        }),
                        thumbnail.thumb({
                            source: `.${serverFilePath}`,
                            suffix: '', 
                            destination: `${serverSmallPath}`,
                            width: 220
                        }),
                    ]).then(data => {
                        req.fileUploaded.thumbnailPath = serverThumbnailFilePath;
                        req.fileUploaded.smallPath = serverSmallFilePath;
                        next();
                    }).catch(err => {
                        res.status(500).send(err.toString());
                    });
                }
                else {
                    res.status(500).send({error: "Unknown file type."});
                }
            }
        });
    }
    else { 
        res.status(403).send({error: `Just allowed upload file type: ${ _.toString(config.ALLOWED_EXTENSION_FILE)}`});
    }
    
};


export function changeUploadImageIntoServer (req, res, next) {
    if(req.files === null) {
        next()
        return;
    }

    if (Object.keys(req.files).length == 0) {
        next();
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let media = req.files.media;
    let fileExtension = getFileExtension(media.name);
    let dir = 'upload';
    

    if(validExtension(fileExtension)) {
        let newFileName = `${generateFileName()}${fileExtension}`;
        let serverFilePath = `/${dir}/${newFileName}`;
        let serverThumbnailPath = `./${dir}/thumbnail`;
        let serverSmallPath = `./${dir}/small`;

        if (!fs.existsSync(serverSmallPath)){
            fs.mkdirSync(serverSmallPath);
        }
        
        // Use the mv() method to place the file somewhere on your server
        media.mv('.' + serverFilePath, (err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {        
                let typeFile = getTypeFile(media.mimetype);
                req.fileUploaded = {
                    type: typeFile, 
                    path: serverFilePath,
                    thumbnailPath: serverFilePath,
                    smallPath: serverFilePath,
                    size: media.size,
                };
                
                if(typeFile == 'image') {
                    let serverThumbnailFilePath = `/${dir}/thumbnail/${newFileName}`;
                    let serverSmallFilePath = `/${dir}/small/${newFileName}`;

                    Promise.all( [
                        thumbnail.thumb({
                            source: `.${serverFilePath}`,
                            suffix: '', 
                            destination: `${serverThumbnailPath}`,
                            width: 480
                        }),
                        thumbnail.thumb({
                            source: `.${serverFilePath}`,
                            suffix: '', 
                            destination: `${serverSmallPath}`,
                            width: 220
                        }),
                    ]).then(data => {
                        req.fileUploaded.thumbnailPath = serverThumbnailFilePath;
                        req.fileUploaded.smallPath = serverSmallFilePath;
                        next();
                    }).catch(err => {
                        res.status(500).send(err.toString());
                    });
                }
                else {
                    res.status(500).send({error: "Unknown file type."});
                }
            }
        });
    }
    else { 
        res.status(403).send({error: `Just allowed upload file type: ${ _.toString(config.ALLOWED_EXTENSION_FILE)}`});
    }
    
};

function generateFileName(fileName) {
    return Math.round(new Date().getTime()/1000);
}

function getFileExtension(fileName) {
    return path.extname(fileName);
}

function validExtension(fileExtension) {
    return _.includes(config.ALLOWED_EXTENSION_FILE, fileExtension.toLowerCase());
}

function getTypeFile(mimeType) {
    return mimeType.split('/')[0];
}
