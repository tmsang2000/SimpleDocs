import User from '../models/user.model';
import Event from '../models/event.model';
import * as HelperService from './helper.service';
import _ from 'lodash';
import { deactiveTokenUser } from '../services/token.service';

let userDefaultData = ['firstName', 'lastName', 'profilePicture', 'isPublished'];

export function getAll() {
    return User.find().populate('following').populate('follower').populate('honoring').populate('honorer');
}

export function add(data, fields = null, excludes_field = null) {
    
    //filter some fields can be updated
    if(fields != null) data = _.pick (data, fields);

    //filter some fields must not be updated
    if(excludes_field != null) data = _.omit (data, excludes_field);

    //hashing password
    if(data.password !== undefined && data.password !== "") {
        data.password = HelperService.hashingPassword(data.password); 
    }

    return User.create(data);
}

export function getOne(_id) {
    return User.findOne({ _id: _id }).populate('following', userDefaultData).populate('follower', userDefaultData).populate('honoring', userDefaultData).populate('honorer', userDefaultData);
}

export function getRegisteredHistory(_id) {
    return User.findOne({ _id: _id}).populate('eventRegisteredHistory.event');
}

export function editOne(_id, updated_data, fields = null, excludes_field = null) {
    //filter some fields can be updated
    if(fields) updated_data = _.pick(updated_data, fields);

    //filter some fields must not be updated
    if(excludes_field != null) updated_data = _.omit (updated_data, excludes_field);

    if(updated_data.password !== undefined && updated_data.password !== "") {
        updated_data.password = HelperService.hashingPassword(updated_data.password); 
        //deactivated all token account  
        // deactiveTokenUser(_id).then();
    }

    return User.findOneAndUpdate({ _id: _id }, updated_data, { 
        new: true,
    });
}

export function deleteOne(id) {
    return User.destroy({
        where: { _id: id }
    });
}

export function authenticate(username, password) {
    return User.findOne({
        $or: [
            { username: username },
            { email: username }
        ],
        password: password,
        //isActivated: true,
        // isSocialAccount: false
    });
}

export function updateNumberPost(_id) {
    return editOne(_id, { $inc: { "numberPost": 1 } }).then(user => user);
}

export function registerEvent(eventId, userId) {
    return User.findOneAndUpdate({ 
        _id: userId,
        "eventRegisteredHistory.event" : { $nin: [eventId] },
    }, {
        $push: { eventRegisteredHistory: { event: eventId } }
    },{ 
        new: true,
    })
}

/**
 * Follow
 */
export function followUser(_id, userIdFollow) {
    return new Promise((resolve, reject) => {
        if(userIdFollow == _id) reject("Cannot follow yourself");
        else {
            addUserFollower(userIdFollow, _id).then(userFollow => {
                resolve(follow(_id, userIdFollow))
            }).catch(err => {
                reject(err)
            })
        }
    })
}

export function unfollowUser(_id, userIdFollow) {
    return new Promise((resolve, reject) => {
        removeUserFollower(userIdFollow, _id).then(userFollow => {
            resolve(unfollow(_id, userIdFollow))
        }).catch(err => {
            reject(err)
        })
    })
}

export function follow(_id, userIdFollow) {
    return User.findOneAndUpdate({ 
        _id: _id,
        following: {
            $nin: [ userIdFollow ]
        }, 
    }, {
        $push: { following: userIdFollow }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

export function addUserFollower(_id, userIdFollower) {
    return User.findOneAndUpdate({ 
        _id: _id,
        follower: {
            $nin: [ userIdFollower ]
        }, 
    }, {
        $push: { follower: userIdFollower }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

export function unfollow(_id, userIdFollow) {
    return User.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { following: userIdFollow }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

export function removeUserFollower(_id, userIdFollower) {
    return User.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { follower: userIdFollower }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

/**
 * Honor User 
 */

export function honorUser(_id, userIdFollow) {
    return new Promise((resolve, reject) => {
        if(userIdFollow == _id) reject("Cannot honor yourself");
        else {
            addUserHonorer(userIdFollow, _id).then(userFollow => {
                resolve(honor(_id, userIdFollow))
            }).catch(err => {
                reject(err)
            })
        }
    })
}

export function unhonorUser(_id, userIdFollow) {
    return new Promise((resolve, reject) => {
        removeUserHonorer(userIdFollow, _id).then(userFollow => {
            resolve(unhonor(_id, userIdFollow))
        }).catch(err => {
            reject(err)
        })
    })
}

export function honor(_id, userIdFollow) {
    return User.findOneAndUpdate({ 
        _id: _id,
        honoring: {
            $nin: [ userIdFollow ]
        }, 
    }, {
        $push: { honoring: userIdFollow }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}

export function addUserHonorer(_id, userIdFollower) {
    return User.findOneAndUpdate({ 
        _id: _id,
        honorer: {
            $nin: [ userIdFollower ]
        }, 
    }, {
        $push: { honorer: userIdFollower }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}

export function unhonor(_id, userIdFollow) {
    return User.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { honoring: userIdFollow }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}

export function removeUserHonorer(_id, userIdFollower) {
    return User.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { honorer: userIdFollower }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}