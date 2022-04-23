import { Router } from 'express'; 
import _ from 'lodash';
import * as UserService from '../services/user.service';
import { verifyJWT_MW } from '../services/auth.service';
import { uploadImageIntoServer } from '../services/upload.service';

const router = Router();

router.post('*', verifyJWT_MW);

/**
 * Upload Image in there
 */
router.post('/', uploadImageIntoServer);

router.post('/', (req, res) => {
    UserService.editOne(req.user._id, { 
        profilePicture: { 
            original: req.fileUploaded.path, 
            thumbnail: req.fileUploaded.thumbnailPath, 
            small: req.fileUploaded.smallPath,
        } 
    }).then(data => {
        res.send({
            type: req.fileUploaded.type,
            path: req.fileUploaded.path,
            thumbnailPath:  req.fileUploaded.thumbnailPath,
            size: req.fileUploaded.size,
        });
    });
    
});

export default router;