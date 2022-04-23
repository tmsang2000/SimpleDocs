import { Router } from 'express';
import { verifyJWT_MW, verifyPermission } from '../services/auth.service';
import { filterLocation } from '../services/filter.service';
import { filterPaginator } from '../services/filter.service';
import { uploadImageIntoServer, changeUploadImageIntoServer } from '../services/upload.service';
// import * as Notification from '../services/notification.service';
import * as EventService from '../services/event.service';
import * as UserService from '../services/user.service';
import * as SearchService from '../services/search.service';
// import * as PlaceService from '../services/place.service';
import { ServerEventSystem } from '../server-events';

import _ from 'lodash';

const router = Router();

/**
 * Filter BEFORE handling
 */

router.all('*', verifyJWT_MW);

/**
 * Verify Permission
 */
//router.get('/', verifyPermission);

/**
 * Get Events
 */
const defaultQuery = {
    offset: 0,
    limit: 8,
    eventId: null,
    type: 0,
    constraint: 0,
    keyword: null,
}

router.get('/', (req, res) => {
    const query = {
        ...defaultQuery,
        ...req.query
    }
    if (query.eventId != null) {
        EventService.getOne(query.eventId).then(data => { res.send(data) });
        EventService.getOne(query.eventId).then(data => {
            data ? res.send(data) : res.status(404).send({error: "Event does not exist."});
        }).catch(error => {
            res.status(400).send({error: "Event ID is not correct or does not exist"});
        })
    }
    else {
        switch (Number(query.constraint)) {
            case 0:
                EventService.getEvent(query).then(data => {
                    res.send(data);
                })            
                break;

            case 1:
                EventService.postByUser(req.user._id).then(data => {
                    data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
                    res.send(data);
                }).catch(error => {
                    res.status(400).send(error);
                })
                break;

            case 2:
                EventService.postOfStaff(req.user._id).then(data => {
                    data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
                    res.send(data);
                }).catch(error => {
                    res.status(400).send(error);
                })
                break;

            case 3: 
                EventService.registerdByUser(req.user._id).then(data => {
                    data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
                    res.send(data);
                }).catch(error => {
                    res.status(400).send(error);
                })

                // UserService.getOne(req.user._id).then(data => {
                //     res.send(data);
                // }).catch(error => {
                //     res.status(400).send({error: "User ID is not correct or not exist"});
                // })

                break;
        
            default:
                res.send("Invalid Constraint");
                break;
        } 
    } 
});

// function getAllPost(req, res) {
//     EventService.getAll().then(data => {
//         data = _.sortBy(data, [(e) => { return parseInt(e.formEnd) }]);
//         res.send(data);
//     });
//  }


 /**
 * Searching event by keyword
 */
// router.get('/search', (req, res) => {
//     let keyword = req.query.keyword;
//     console.log("Searching")
//     if(keyword == undefined || keyword === "") {
//         res.status(400).send({error: "Require parameter keyword Ex:?keyword=xxx"})
//     }
//     else {      
//         SearchService.searchEvent(keyword).then(data => res.send(data));       
//     }
// });

/**
 * Upload Image in there
 */
router.post('/', uploadImageIntoServer);

/**
 * Create an event (DONE)
 */
router.post('/', (req, res) => {
    req.body.media = {
        type: req.fileUploaded.type,
        path: { 
            original: req.fileUploaded.path, 
            thumbnail: req.fileUploaded.thumbnailPath,
            small: req.fileUploaded.smallPath,
        }
    };

    const event = {
        userCreated: req.user._id,
        createdForm: {
            ...req.body
        }
    }

    EventService.add(event).then(post => post).then(post => {
        res.send(post);
        UserService.updateNumberPost(req.user._id).then(user => user);
    }).catch(error => {
        res.status(202).send({error: error.message});
    })
});

/*
* Update event info (DONE)
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
    EventService.editOne(req.params.id, req.body).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(400).send({error: "Cannot update. No resource exist"});
    })
});

/**
 * Delete a specific event by eventId (DONE)
 */

router.delete('/:eventId/', (req, res) => {
    EventService.remove(req.params.eventId, req.user._id).then(event => {
        if(!event) {
            res.status(202).send({error: "Cannot excuted. Event not exist or you not created it."});
        }
        res.send(event)
    }).catch(error => {
        res.status(400).send(error);
    })
})

/**
 * Register specific event (DONE)
 */

router.post('/:eventId/register', (req, res) => {
    console.log(req.user._id);
    EventService.registerEvent(req.params.eventId, req.user._id).then(event => {
        if(!event) {
            res.status(202).send({error: "Cannot Register. The event does not exist!"});
        }
        else {
            UserService.registerEvent(req.params.eventId, req.user._id);
            res.send(event);
        }
    }).catch(error => {
        res.status(400).send(error);
    })
})


/**
 * Unregister specific post (DONE)
 */

router.delete('/:eventId/register', (req, res) => {
    EventService.unRegisterEvent(req.params.eventId, req.user._id).then(event => {
        if(!event) {
            res.status(202).send({error: "Cannot excuted. User have never been registered yet."});
        }

        res.send(event)
    }).catch(error => {
        res.status(400).send(error);
    })
})

/**
 * AddStaff specific event (DONE)
 */

router.post('/:eventId/staff', (req, res) => {
    EventService.addStaff(req.params.eventId, req.query.userId, req.query.role).then(event => {
        if(!event) {
            res.status(202).send({error: "Cannot excuted. User haved been add yet."});
        }
        else {
            res.send(event);
        }
    }).catch(error => {
        res.status(400).send(error);
    })
})

/**
 * Get posts by userStaff
 */

router.get('/userstaff', (req, res) => {
    EventService.postOfStaff(req.user._id).then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
        res.send(data);
    }).catch(error => {
        res.status(400).send(error);
    })
 })

/**
 * Get posts by userScanner
 */

 router.get('/userscanner', (req, res) => {
    EventService.postOfScanner(req.user._id).then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
        res.send(data);
    }).catch(error => {
        res.status(400).send(error);
    })
 })
 
/**
 * Get posts by userCreated
 */

 router.get('/usercreated', (req, res) => {
    EventService.postByUser(req.user._id).then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
        res.send(data);
        
    }).catch(error => {
        res.status(400).send(error);
    })
 })

 /**
 * Get posts by userRegistered
 */

 router.get('/registered', (req, res) => {
    EventService.registerdByUser(req.user._id).then(data => {
        data = _.sortBy(data, [(e) => { return parseInt(e.formEnd)}]);
        res.send(data);
        
    }).catch(error => {
        res.status(400).send(error);
    })
 })


/**
 * Get post by postId
 */

router.get('/:postId', (req, res) => {
    EventService.getOne(req.params.postId).then(data => {
        data ? res.send(data) : res.status(404).send({error: "Post is not exist."});
    }).catch(error => {
        res.status(400).send({error: "Post ID is not correct or not exist"});
    })
})

// /**
//  * Add register to specific post
//  */

router.post('/:postId/:userId/register', (req, res) => {
    EventService.registerEvent(req.params.postId, req.params.userId).then(post => {
        
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


// /**
//  * Delete register in specific post
//  */

router.delete('/:postId/:userId/register', (req, res) => {
    EventService.unRegisterEvent(req.params.postId, req.params.userId).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User have never been liked yet."});
        }

        res.send(post)
    }).catch(error => {
        res.status(400).send(error);
    })
})

// /**
//  * Active Check
//  */

router.post('/:postId/:userId/firstcheck', (req, res) => {
    EventService.firstCheckAttendance(req.params.postId, req.params.userId).then(post => {
        
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

router.post('/:postId/:userId/secondcheck', (req, res) => {
    EventService.secondCheckAttendance(req.params.postId, req.params.userId).then(post => {
        
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
 * deleteStaff specific post
 */

router.delete('/:postId/:userId/staff', (req, res) => {
    EventService.deleteStaff(req.params.postId, req.params.userId).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User have never been add yet."});
        }

        res.send(post)
    }).catch(error => {
        res.status(400).send(error);
    })
})

// /**
//  * AddScanner specific post
//  */

router.post('/:postId/:userId/scanner', (req, res) => {
    EventService.addScanner(req.params.postId, req.params.userId).then(post => {
        
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User haved been add yet."});
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


// /**
//  * DeleteScanner specific post
//  */

router.delete('/:postId/:userId/scanner', (req, res) => {
    EventService.deleteScanner(req.params.postId, req.params.userId).then(post => {
        if(!post) {
            res.status(202).send({error: "Cannot excuted. User have never been add yet."});
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

export default router;