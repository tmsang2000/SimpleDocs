import Post from '../models/news';
import User from '../models/user.model';
// import Place from '../models/place.model';
import _ from 'lodash';
import { Types } from 'mongoose';

let userDefaultData = ['firstName', 'lastName', 'profilePicture'];

export function getAll() {
    return Post.find().populate('userCreated', userDefaultData);
}

export function getOne(_id) {
    return Post.findOne({ _id: _id }).populate('userRegistered', userDefaultData).populate('eventLeader', userDefaultData).populate('userChecked', userDefaultData).populate('userCreated', userDefaultData);
}

export function add(data) {
    return Post.create(data);
}

export function remove(_id, userId) {
    return Post.findOneAndDelete({ 
        _id: _id,
        userCreated: userId
    });
}

export function editOne(_id, updated_data) {
    return Post.findOneAndUpdate({ _id: _id }, updated_data, { 
        new: true,
    });
}

export function postNearby(coordinate, radius, pageSize, offsetId) {
    // return Place.aggregate([
    //     {
    //         $geoNear: {
    //             near: {
    //                 type: "Point",
    //                 coordinates: coordinate
    //             },
    //             distanceField: "distance",
    //             maxDistance: radius,
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: 'post',
    //             let: { placeId: "$_id"},
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             $and: [
    //                                 { $eq: ["$placeId", "$$placeId"] },
    //                                 { $gte: [ "$createdAt", new Date((new Date()).getTime()- 1000 * 60 * 60 * 3) ] }
    //                             ]
    //                         }
    //                     }
    //                 }
    //             ],
    //             as: 'post'
    //         }
    //     },
    //     {
    //         $addFields: {
    //             peopleVisiting: {
    //                 $size: {
    //                     $setUnion: {
    //                         $map: {
    //                             input: "$post",
    //                             as: "post",
    //                             in: "$$post.userPost" 
    //                         }
    //                     }
    //                 }
    //             },
    //         }
    //     },
    //     {
    //         $unwind: "$post"
    //     },
    //     {
    //         $project: {
    //             _id: "$post._id",
    //             media: "$post.media",
    //             friends: "$post.friends",
    //             interactUser: "$post.interactUser",
    //             content: "$post.content",
    //             placeId: {
    //                 _id: "$_id",
    //                 location: "$location",
    //                 name: "$name"
    //             },
    //             rate: "$post.rate",
    //             userPost: "$post.userPost",
    //             atTime:  "$post.atTime",
    //             createdAt:  "$post.createdAt",
    //             distance: "$distance",
    //             peopleVisiting: "$peopleVisiting"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'user',
    //             localField: 'userPost',
    //             foreignField: '_id',
    //             as: 'userPost'
    //         }
    //     },
    //     {
    //         $unwind: "$userPost"
    //     },
    //     {
    //         $project: {
    //             "userPost.isActivated": 0,
    //             "userPost.following": 0,
    //             "userPost.honoring": 0,
    //             "userPost.follower": 0,
    //             "userPost.honorer": 0,
    //             "userPost.username": 0,
    //             "userPost.password": 0,
    //             "userPost.email": 0,
    //             "userPost.createdAt": 0,
    //             "userPost.updatedAt": 0,
    //             "userPost.__v": 0,
    //             "userPost.bio": 0,
    //             "userPost.gender": 0,
    //             "userPost.phone": 0,
    //         }
    //     },
    //     {
    //         $sort: {
    //             atTime: -1,
    //             distance: -1
    //         }
    //     },
    //     {
    //         $match: {
    //             $expr: {
    //                 $cond: {
    //                     if: { $not: [ {$eq: [null, offsetId] } ] }, 
    //                     then: {
    //                         $lte: ["$_id", Types.ObjectId(offsetId)]
    //                     }, 
    //                     else: {
                            
    //                     }
    //                 }
    //             }
                
    //         }
    //     },
    //     {
    //         $limit: pageSize
    //     }
    // ]);
}

export function registerEvent(_id, userId) {
    return Post.findOneAndUpdate({ 
        _id: _id,
        userRegistered: {
            $nin: [ userId ]
        }, 
    }, {
        $push: { userRegistered: userId }
    },{ 
        new: true,
    }).populate('userRegistered', userDefaultData);
}

export function unRegisterEvent(_id, userId) {
    return Post.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { userRegistered: userId }
    }, { 
        new: true,
    }).populate('userRegistered', userDefaultData);;
}

export function checkinEvent(_id, userId) {
    return Post.findOneAndUpdate({ 
        _id: _id,
        userChecked: {
            $nin: [ userId ]
        }, 
    }, {
        $push: { userChecked: userId }
    },{ 
        new: true,
    }).populate('userChecked', userDefaultData);
}

export function deleteUserCheckinEvent(_id, userId) {
    return Post.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { userChecked: userId }
    }, { 
        new: true,
    }).populate('userChecked', userDefaultData);;
}

export function addLeader(_id, userId) {
    return Post.findOneAndUpdate({ 
        _id: _id,
        eventLeader: {
            $nin: [ userId ]
        }, 
    }, {
        $push: { eventLeader: userId }
    },{ 
        new: true,
    }).populate('eventLeader', userDefaultData);
}

export function deleteLeader(_id, userId) {
    return Post.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { eventLeader: userId }
    }, { 
        new: true,
    }).populate('eventLeader', userDefaultData);;
}

export function postByUser(userPost) {
    return Post.find({userCreated: userPost}).populate('userCreated').populate('eventLeader')
}

export function postOfLeader(userPost) {
    return Post.find({eventLeader: userPost}).populate('userCreated').populate('eventLeader')
}