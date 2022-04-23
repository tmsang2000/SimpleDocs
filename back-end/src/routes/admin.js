import { Router } from 'express';
import * as AdminService from '../services/admin.service';
import { verifyJWT_MW } from '../services/auth.service';

const router = Router();

/*
* Signup 
*/

router.post('/', (req, res) => {
    if(!req.body.firstName) {
        req.body.firstName = req.body.username;
    }
    
    AdminService.add(req.body).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(202).send({error: error.message});
    })
})

/*
* Authenticate required
*/

router.patch('*', verifyJWT_MW);
router.get('*', verifyJWT_MW);

/*
* Update personal info
*/
router.patch('/:id', (req, res) => {
    AdminService.editOne(req.params.id, req.body, null, ['username', 'email']).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(400).send({error: "Cannot update. No resource exist"});
    })
});

/*
* Get personal info
*/
router.get('/:id', (req, res) => {
    AdminService.getOne(req.params.id).then(data => {
        data ? res.send(data) : res.status(404).send({error: "User is not exist."});
    }).catch(error => {
        res.status(400).send({error: "User ID is not correct or not exist"});
    })
});

/**
 * List of all user
 */
router.get('/', (req, res) => {
    AdminService.getAll().then(data => {
        res.send(data);
    });
})

export default router;