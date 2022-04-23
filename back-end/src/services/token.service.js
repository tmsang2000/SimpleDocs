import UserToken from '../models/userToken';
import _ from 'lodash';
import { Types } from 'mongoose';

export function create(data){
    return UserToken.create(data);
}

export function deactiveTokenUser(user) {
    return UserToken.updateMany({
        user: Types.ObjectId(user)
    }, {
        isActivated: false
    });
}

export function deactiveToken(token) {
    return UserToken.findOneAndUpdate({ 
        token: token 
    }, { 
        isActivated: false 
    });
}

export function verifyToken(token) {
    return UserToken.findOne({
        token: token, 
        isActivated: true
    });
}

export function updateTokenLastActiveTime(token) {
    return UserToken.findOneAndUpdate({
        token: token,
        isActivated: true
    }, {
        lastTime: Date.now()
    });
}