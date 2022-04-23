import { Router } from 'express';
import * as UserService from '../services/user.service';
import * as AdminService from '../services/admin.service';
import * as AuthenticateService from '../services/auth.service';
import * as HelperService from '../services/helper.service';
import * as UserTokenService from '../services/token.service';

const router = Router();

function createToken(req, userId, role) {

    let token = AuthenticateService.createJWToken({
        sessionData: {
            _id: userId,
            role: role
        },
        maxAge: 3600
    });

    UserTokenService.create({
        token: token, 
        user: userId,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
    });

    return token;
}
/*
* Login
*/

router.post('/user', (req, res) => {
    let { username, password } = req.body
    console.log(req.body);
    UserService.authenticate(username, HelperService.hashingPassword(password)).then(data => {
        if(data) {
            res.status(200).json({
                success: true,
                token: createToken(req, data._id, 'user')
            });
        }
        else {
            res.status(401).json({
                message: "Validation failed. Given username and password aren't matching."
            })
        }
    })
});

router.post('/admin', (req, res) => {
    let { username, password } = req.body
    console.log(req.body);
    AdminService.authenticate(username, HelperService.hashingPassword(password)).then(data => {
        if(data) {
            res.status(200).json({
                success: true,
                token: createToken(req, data._id, 'admin')
            });
        }
        else {
            res.status(401).json({
                message: "Validation failed. Given username and password aren't matching."
            })
        }
    })
});

export default router;