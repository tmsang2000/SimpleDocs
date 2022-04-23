import ImageService, {upload} from '../services/image';
const path = require('path')
import Image from '../models/image';
import image from '../models/image';
const fs = require('fs')
const mime = require('mime-types');


class ImageController {
    
    async upload(req, res) {
        try {
            upload(req, res, (err) => {
                if (err) {
                    res.status(400).json({ message: err.message })
                    return
                }
                // console.log(req)
                const imagePath = path.join('images', req.file.filename)
                // console.log(imagePath)
                const model = new Image({
                    name: req.file.filename,
                    image_path: imagePath,
                    created_at: new Date()
                })
                console.log("ahihi");
                model.save((err) => {
                    if (err)  {
                        console.log("err")
                        return res.status(500).json({message: err.message})
                    }
        
                    res.status(200).json({ message: `Uploaded image "${req.file.filename}" successfully`, uri: "images/"+ req.file.filename })
                })
            })
        //   return res.status(200).json({ success: true, payload: events });
        } catch (err) {
          return res.status(400).json({ success: false, err });
        }
    }
    async getImg(req, res) {
        try {
            Image.find({name: req.params.image_name}, {image_path: 1, _id: 0}).limit(1).exec((err, docs) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({message: err.message})
                }
        
                if (docs.length === 0) {
                    return res.status(404).json({ message: 'No such image file' })
                }
                const URL = "/apps/firstproject/back-end"
                const imagePath = path.join(URL, docs[0].image_path)
                try {
                   
                    const buffer = fs.readFileSync(imagePath)
                    const mime_type = mime.contentType('png');
                    res.writeHead(200, { 'Content-Type': mime_type })
                    res.end(buffer, 'binary')
                } catch (error) {
                    console.log(error.code)
                    if (error.code === 'ENOENT') {
                        res.status(404).json({ message: 'No such image file' })
                    } else {
                        res.status(500).json({ message: error.message })
                    }
                }
            })
        } catch (err) {
          return res.status(400).json({ success: false });
        }
      }
}
export default new ImageController();
