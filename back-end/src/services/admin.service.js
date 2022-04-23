import Admin from '../models/admin.model';
import * as HelperService from './helper.service';
import _ from 'lodash';
import { deactiveTokenAdmin } from '../services/token.service';

let AdminDefaultData = ['firstName', 'lastName', 'profilePicture', 'isPublished'];

export function getAll() {
    return Admin.find().populate('following').populate('follower').populate('honoring').populate('honorer');
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

    return Admin.create(data);
}

export function getOne(_id) {
    return Admin.findOne({ _id: _id }).populate('following', AdminDefaultData).populate('follower', AdminDefaultData).populate('honoring', AdminDefaultData).populate('honorer', AdminDefaultData);
}

export function editOne(_id, updated_data, fields = null, excludes_field = null) {
    //filter some fields can be updated
    if(fields) updated_data = _.pick(updated_data, fields);

    //filter some fields must not be updated
    if(excludes_field != null) updated_data = _.omit (updated_data, excludes_field);

    if(updated_data.password !== undefined && updated_data.password !== "") {
        updated_data.password = HelperService.hashingPassword(updated_data.password); 
        //deactivated all token account  
        // deactiveTokenAdmin(_id).then();
    }

    return Admin.findOneAndUpdate({ _id: _id }, updated_data, { 
        new: true,
    });
}

export function deleteOne(id) {
    return Admin.destroy({
        where: { _id: id }
    });
}

export function authenticate(Adminname, password) {
    return Admin.findOne({
        $or: [
            { username: Adminname },
            { email: Adminname }
        ],
        password: password,
        //isActivated: true,
        // isSocialAccount: false
    });
}

export function updateNumberPost(_id) {
    return editOne(_id, { $inc: { "numberPost": 1 } }).then(Admin => Admin);
}

/**
 * Follow
 */
export function followAdmin(_id, AdminIdFollow) {
    return new Promise((resolve, reject) => {
        if(AdminIdFollow == _id) reject("Cannot follow yourself");
        else {
            addAdminFollower(AdminIdFollow, _id).then(AdminFollow => {
                resolve(follow(_id, AdminIdFollow))
            }).catch(err => {
                reject(err)
            })
        }
    })
}

export function unfollowAdmin(_id, AdminIdFollow) {
    return new Promise((resolve, reject) => {
        removeAdminFollower(AdminIdFollow, _id).then(AdminFollow => {
            resolve(unfollow(_id, AdminIdFollow))
        }).catch(err => {
            reject(err)
        })
    })
}

export function follow(_id, AdminIdFollow) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
        following: {
            $nin: [ AdminIdFollow ]
        }, 
    }, {
        $push: { following: AdminIdFollow }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

export function addAdminFollower(_id, AdminIdFollower) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
        follower: {
            $nin: [ AdminIdFollower ]
        }, 
    }, {
        $push: { follower: AdminIdFollower }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

export function unfollow(_id, AdminIdFollow) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { following: AdminIdFollow }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

export function removeAdminFollower(_id, AdminIdFollower) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { follower: AdminIdFollower }
    }, { 
        new: true,
    }).populate('following').populate('follower');
}

/**
 * Honor Admin 
 */

export function honorAdmin(_id, AdminIdFollow) {
    return new Promise((resolve, reject) => {
        if(AdminIdFollow == _id) reject("Cannot honor yourself");
        else {
            addAdminHonorer(AdminIdFollow, _id).then(AdminFollow => {
                resolve(honor(_id, AdminIdFollow))
            }).catch(err => {
                reject(err)
            })
        }
    })
}

export function unhonorAdmin(_id, AdminIdFollow) {
    return new Promise((resolve, reject) => {
        removeAdminHonorer(AdminIdFollow, _id).then(AdminFollow => {
            resolve(unhonor(_id, AdminIdFollow))
        }).catch(err => {
            reject(err)
        })
    })
}

export function honor(_id, AdminIdFollow) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
        honoring: {
            $nin: [ AdminIdFollow ]
        }, 
    }, {
        $push: { honoring: AdminIdFollow }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}

export function addAdminHonorer(_id, AdminIdFollower) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
        honorer: {
            $nin: [ AdminIdFollower ]
        }, 
    }, {
        $push: { honorer: AdminIdFollower }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}

export function unhonor(_id, AdminIdFollow) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { honoring: AdminIdFollow }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}

export function removeAdminHonorer(_id, AdminIdFollower) {
    return Admin.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { honorer: AdminIdFollower }
    }, { 
        new: true,
    }).populate('honoring').populate('honorer');
}