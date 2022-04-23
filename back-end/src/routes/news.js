import { Router } from 'express';
import { verifyJWT_MW } from '../services/auth.service';
import { filterLocation } from '../services/filter.service';
import { filterPaginator } from '../services/filter.service';
import { uploadImageIntoServer, changeUploadImageIntoServer } from '../services/upload.service';
// import * as Notification from '../services/notification.service';
import * as PostService from '../services/news.service';
import * as UserService from '../services/user.service';
// import * as PlaceService from '../services/place.service';
import { ServerEventSystem } from '../server-events';

import _ from 'lodash';

const router = Router();

/**
 * Filter BEFORE handling
 */
router.all('*', verifyJWT_MW);


router.get('/', (req, res) => {
    // let key = _.head(_.keys(req.query));
    
    // switch(key) {
    //     case 'place':
    //         if(req.query.user) {
    //             getPostAtLocationByUser(req, res);
    //         }
    //         else if(req.query.active) {
    //             getPostByLocation(req, res)
    //         }
    //         else {
    //             getPostByLocation(req, res)
    //         }
    //         break;
    //     default: 
            getAllPost(req, res);
    // }
});

/**
 * Get all post
 */

 function getAllPost(req, res) {
    PostService.getAll().then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.createdAt) * -1 }]);
        res.send(data);
    });
 }

/**
 * Get post at location by user
 */

function getPostAtLocationByUser(req, res) {
    PostService.locationPostByUser(req.query.place, req.query.user).then(post => {
        res.send(post)
    }).catch(error => {
        res.status(400).send(error)
    })
}

/**
 * Upload Image in there
 */
router.post('/', uploadImageIntoServer);

/**
 * Create post
 */
router.post('/', (req, res) => {
    req.body.userCreated = req.user._id;
    req.body.media = {
        type: req.fileUploaded.type,
        path: { 
            original: req.fileUploaded.path, 
            thumbnail: req.fileUploaded.thumbnailPath,
            small: req.fileUploaded.smallPath,
        }
    };

    // req.body.friends = req.body.friends != "" &&  req.body.friends !== undefined ? req.body.friends.split(",") : [];

    PostService.add(req.body).then(post => post).then(post => {
        res.send(post);
        /**
         * update numberPost of user.
         */
        // UserService.updateNumberPost(req.user._id).then(user => user);
        
    }).catch(error => {
        res.status(202).send({error: error.message});
    })
});

/**
 * Get posts by user
 */
router.get('/userlead', (req, res) => {
    PostService.postOfLeader(req.user._id).then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.createdAt) * -1 }]);
        res.send(data);
        
    }).catch(error => {
        res.status(400).send(error);
    })
 })
 
 router.get('/usercreated', (req, res) => {
    PostService.postByUser(req.user._id).then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.createdAt) * -1 }]);
        res.send(data);
        
    }).catch(error => {
        res.status(400).send(error);
    })
 })


/**
 * Get post detail
 */
router.get('/:postId', (req, res) => {
    PostService.getOne(req.params.postId).then(data => {
        data ? res.send(data) : res.status(404).send({error: "Post is not exist."});
    }).catch(error => {
        res.status(400).send({error: "Post ID is not correct or not exist"});
    })
})

// /**
//  * Register specific post
//  */
router.post('/:postId/register', (req, res) => {
    PostService.registerEvent(req.params.postId, req.user._id).then(post => {
        
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User haved been liked yet."});
        }
        else {
            res.send(post);

            // Notification.generateMessage('post', 'like', req.user._id, post._id, post.userPost, false, post).then(data => {
            //     if(data) ServerEventSystem.notifyUser(post.userPost, data);
            // })
        }
    }).catch(error => {
        res.status(400).send(error);
    })
})


/**
 * Unlike specific post
 */
router.delete('/:postId/register', (req, res) => {
    PostService.unRegisterEvent(req.params.postId, req.user._id).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User have never been liked yet."});
        }

        res.send(post)
    }).catch(error => {
        res.status(400).send(error);
    })
})

router.post('/:postId/:userId/checkin', (req, res) => {
    PostService.checkinEvent(req.params.postId, req.params.userId).then(post => {
        
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User haved been liked yet."});
        }
        else {
            res.send(post);

            // Notification.generateMessage('post', 'like', req.user._id, post._id, post.userPost, false, post).then(data => {
            //     if(data) ServerEventSystem.notifyUser(post.userPost, data);
            // })
        }
    }).catch(error => {
        res.status(400).send(error);
    })
})


/**
 * Unlike specific post
 */
router.delete('/:postId/:userId/checkin', (req, res) => {
    PostService.deleteUserCheckinEvent(req.params.postId, req.params.userId).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User have never been liked yet."});
        }

        res.send(post)
    }).catch(error => {
        res.status(400).send(error);
    })
})

// /**
//  * Addleader specific post
//  */
router.post('/:postId/:userId/addlead', (req, res) => {
    PostService.addLeader(req.params.postId, req.params.userId).then(post => {
        
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User haved been liked yet."});
        }
        else {
            res.send(post);

            // Notification.generateMessage('post', 'like', req.user._id, post._id, post.userPost, false, post).then(data => {
            //     if(data) ServerEventSystem.notifyUser(post.userPost, data);
            // })
        }
    }).catch(error => {
        res.status(400).send(error);
    })
})


/**
 * Unlike specific post
 */
router.delete('/:postId/:userId/addlead', (req, res) => {
    PostService.deleteLeader(req.params.postId, req.params.userId).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User have never been liked yet."});
        }

        res.send(post)
    }).catch(error => {
        res.status(400).send(error);
    })
})

/**
 * Delete specific post
 */
router.delete('/:postId/', (req, res) => {
    PostService.remove(req.params.postId, req.user._id).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. Event not exist or you not created it."});
        }

        res.send(post)
    }).catch(error => {
        res.status(400).send(error);
    })
})


/**
 * Upload Image in there
 */
router.patch('/:id', changeUploadImageIntoServer);


/*
* Update event info
*/
router.patch('/:id', (req, res) => {
    if(req.files !== null)
        req.body.media = {
            type: req.fileUploaded.type,
            path: { 
                original: req.fileUploaded.path, 
                thumbnail: req.fileUploaded.thumbnailPath,
                small: req.fileUploaded.smallPath,
            }
        };
    console.log(req.body)
    PostService.editOne(req.params.id, req.body).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(400).send({error: "Cannot update. No resource exist"});
    })
});



export default router;