import { Router } from 'express';
import * as UserService from '../services/user.service';
// import * as InvitationService from '../services/invitation.service';
// import * as NotificationService from '../services/notification.service';
import { verifyJWT_MW } from '../services/auth.service';
import { ServerEventSystem } from '../server-events';
// import * as Notification from '../services/notification.service';
import * as HelperService from '../services/helper.service';
import { uploadImageIntoServer, changeUploadImageIntoServer } from '../services/upload.service';

const router = Router();

/*
* Authenticate required
*/
router.patch('*', verifyJWT_MW);
router.get('*', verifyJWT_MW);

/*
* Update personal info
*/

router.patch('/', (req, res) => {

    UserService.editOne(req.user._id, req.body, null, ['username', 'password']).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(400).send({error: "Cannot update. No resource exist"});
    })
});

/*
* Update password
*/
router.patch('/changePassword', (req, res) => {
    let { oldPassword, newPassword } = req.body;

    UserService.getOne(req.user._id).then(data => {
        if(!data) res.status(404).send({error: "User is not exist."});
        else {
            if(data.password !== HelperService.hashingPassword(oldPassword) ) res.status(403).send({error: "Old password is not correctly."});
            else { 
                UserService.editOne(req.user._id, { password: newPassword }, ['password']).then(data => {
                    res.send(data);
                }).catch(error => {
                    res.status(400).send({error: "Cannot update. No resource exist"});
                })
            }
        }
    }).catch(error => {
        res.status(400).send({error: "User ID is not correct or not exist"});
    })
    
});


/*
* Get personal info
*/
router.get('/', (req, res) => {
    UserService.getOne(req.user._id).then(data => {
        data ? res.send(data) : res.status(404).send({error: "User is not exist."});
    }).catch(error => {
        res.status(400).send({error: "User ID is not correct or not exist"});
    })
});

/*
* Get personal notification
*/
router.get('/notification', (req, res) => {
    //update actived for noti is expried.
    NotificationService.unActivatedNotificationDrink().then(data => {});

    NotificationService.getNotificationByUserReceived(req.user._id).then(data => {
        res.send(data);
    });
});

router.post('/notification/:notificationId', verifyJWT_MW);

/**
 * Read notification
 */
router.post('/notification/:notificationId', (req, res) => {
    NotificationService.readNotification(req.params.notificationId).then(data => {
        res.send(data);
    });
});

/*
* Authenticate required
*/
router.post('/follow', verifyJWT_MW);
router.delete('/follow', verifyJWT_MW);

/*
* Following another user
*/
router.post('/follow', (req, res) => {
    UserService.followUser(req.user._id, req.body.followUserId).then(userFollow => {
        if(!userFollow) {
            res.status(202).send({error: "Cannot excuted. User haved been following yet."});
        }

        NotificationService.generateMessage('user', 'follow', req.user._id, req.body.followUserId, req.body.followUserId).then(data => {
            if(data) ServerEventSystem.notifyUser(req.body.followUserId, data);
            res.send(userFollow);
        })

    }).catch(error => {
        res.status(400).send({error: "Cannot excuted. User is followed is not exist."});
    })    
});

/**
 * Unfollow another user
 */
router.delete('/follow', (req, res) => {
    UserService.unfollowUser(req.user._id, req.body.followUserId).then(userFollow => {
        if(!userFollow) {
            res.status(202).send({error: "Cannot excuted. User haved been following yet."});
        }
        
        res.send(userFollow);
    }).catch(error => {
        res.status(400).send({error: "Cannot excuted. User is unfollow is not exist."});
    })    
});


/*
* Authenticate required
*/
router.post('/honor', verifyJWT_MW);
router.delete('/honor', verifyJWT_MW);

/*
* Honor another user
*/
router.post('/honor', (req, res) => {
    UserService.honorUser(req.user._id, req.body.honoredUserId).then(userFollow => {
        if(!userFollow) {
            res.status(202).send({error: "Cannot excuted. User haved been following yet."});
        }

        res.send(userFollow);
    }).catch(error => {
        res.status(400).send({error: "Cannot excuted. User is honored is not exist."});
    })    
});

/**
 * Unhonor another user
 */
router.delete('/honor', (req, res) => {
    UserService.unhonorUser(req.user._id, req.body.honoredUserId).then(userFollow => {
        if(!userFollow) {
            res.status(202).send({error: "Cannot excuted. User haved been following yet."});
        }
        
        res.send(userFollow);
    }).catch(error => {
        res.status(400).send({error: "Cannot excuted. User is unhonor is not exist."});
    })    
});

/*
* Authenticate required
*/
router.post('/invite', verifyJWT_MW);

/**
 * Invite User
 */
router.post('/invite', (req, res) => {
    let { invitedUserId } = req.body;
    if(!invitedUserId) res.status(400).send({error: "Nobody is invited."});
    else {
        InvitationService.add(InvitationService.createInvite(req.user._id, invitedUserId)).then(invitation => {
            res.send(invitation);
    
            Notification.generateMessage('drink', 'invite', req.user._id, invitation._id, invitation.toUser, true, invitation).then(data => {
                if(data) ServerEventSystem.notifyUser(invitation.toUser, data);
            })
        }).catch(error => {
            res.status(400).send({error: "Cannot excuted."});
        })    
    }
    
});

export default router;