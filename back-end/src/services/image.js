import Image from '../models/image';
const path = require('path')
// const fileType = require('file-type')
const multer = require('multer')
// const fs = require('fs')

export const upload = multer({
    dest: 'images/',
    fileFilter: (req, file, callback) => {
        if (!/\S+\.(jpg|bmp|gif|png)/gi.test(file.originalname)) {
            return callback(Error('Invalid image file name'), false)
        }

        callback(null, true)
        // const reqName = req.params.image_name
        // Image.find({ name: reqName }).limit(1).exec((err, res) => {
        //     if (err) {
        //         console.log(err)
        //         return callback(err, false)
        //     }

        //     if (res.length === 0) callback(null, true)
        //     else callback(Error(`Image with name: "${reqName}" exists`), false)
        // })
    }
}).single('image')

class ImageService {

    
  
  }
  
  export default new ImageService();