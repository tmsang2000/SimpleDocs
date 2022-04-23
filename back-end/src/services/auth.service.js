import jwt from 'jsonwebtoken'
import _ from 'lodash'
import config from '../config';
import { verifyToken } from './token.service';
import { updateTokenLastActiveTime } from './token.service';

export function verifyPermission(req, res, next) {
    if (req.user.role == 'user') res.status(202).send({message: "Permission Denied"});
    next();
}

export function verifyJWT_MW(req, res, next)
{
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    verifyJWTToken(token).then((decodedToken) => {
        req.user = decodedToken.data;
        verifyUserToken(token).then(user => {
            if (user) {
                updateTokenLastActiveTime(token).then();
                next();
            }
            else res.status(400).json({error: "Token is expired."});
        })   
    }).catch((err) => {
        res.status(400).json({error: "Invalid auth token provided."})
    })
}

export function verifyJWTToken(token, secret_key = config.JWT_SECRET_KEY) 
{
    return new Promise((resolve, reject) =>
    {
        if(!token) reject("Empty token");
        
        jwt.verify(token, secret_key, (err, decodedToken) => 
        {
            if (err || !decodedToken)
            {
                return reject(err);
            }

            resolve(decodedToken);
        })
    });
}

export function verifyUserToken(token) {
    return verifyToken(token);
}


export function createJWToken(details, secret_key = config.JWT_SECRET_KEY)
{
    if (typeof details !== 'object')
    {
        details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number')
    {
        details.maxAge = 31536000
    }
    
    let token = jwt.sign({
        data: details.sessionData
    }, secret_key, {
        expiresIn: '100 days',
        algorithm: 'HS256'
    })

    return token
}
