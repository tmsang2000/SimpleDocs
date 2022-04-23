import Event from '../models/event.model';
import User from '../models/user.model';
// import Place from '../models/place.model';
import _ from 'lodash';
import { Types } from 'mongoose';

let userDefaultData = ['firstName', 'lastName', 'profilePicture'];

export function getEvent(query) {
    let now = new Date();
    return Event.aggregate([
        // {
        //     $match: {
        //         $or: [ { $text: { $search: query.keyword } }, {}] 
        //     }
        // },
        (query.keyword == null) ? { $skip: 0 } :
        {
            $match: { $text: { $search: query.keyword } }
        },
        {
            $addFields: { typeGet: query.type }
        },
        {
            $match: {
                $expr: {
                    $cond: {
                        if: { $eq: ["3", "$typeGet"] }, 
                        then: { $and: [
                                { $eq: ["$eventStatus.start.isStart", true] },
                                { $eq: ["$eventStatus.end.isEnd", false] } ] }, 
                        else: {
                            $cond: {
                                if: { $eq: ["2", "$typeGet"] }, 
                                then: { $eq: ["$createdForm.isUrgent", true] },
                                else: {
                                    $cond: {
                                        if: { $eq: ["1", "$typeGet"] }, 
                                        then: { $and: [
                                                { $lte: ["$createdForm.formStart", { $dayOfYear: now}] },
                                                { $gte: ["$createdForm.formEnd", { $dayOfYear: now}] } ] },
                                        else: { }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    ]).limit(Number(query.limit))
}

export function getOne(_id) {
    return Event.findOne({ _id: _id }).populate('userRegistered.user', userDefaultData)
                                    .populate('eventStaff', userDefaultData)
                                    .populate('userChecked', userDefaultData)
                                    .populate('userCreated', userDefaultData)
                                    .populate('eventScanner', userDefaultData);
}

export function add(data) {
    return Event.create(data);
}

export function remove(_id, userId) {
    return Event.findOneAndDelete({ 
        _id: _id,
        userCreated: userId
    });
}

export function editOne(_id, updated_data) {
    return Event.findOneAndUpdate({ _id: _id }, updated_data, { 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
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

export function registerEvent(eventId, userId) {

    // User.findOneAndUpdate({ 
    //     _id: userId,
    //     "eventRegisteredHistory.event": { $nin: [eventId] },
    // }, {
    //     $push: { eventRegisteredHistory: { event: eventId } }
    // },{ 
    //     new: true,
    // });

    return Event.findOneAndUpdate({ 
        _id: eventId,
        "userRegistered.user" : { $nin: [userId] }, 
    }, {
        $push: { userRegistered: { user: userId } }
    },{ 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function unRegisterEvent(eventId, userId) {
    return Event.findOneAndUpdate({ 
        _id: eventId,
    }, {
        $pull: { userRegistered: {user: userId} }
    }, { 
        new: true,
    });
}

export function firstCheckAttendance(eventId, userId) {
    return Event.findOneAndUpdate({ 
        _id: eventId,
        "userRegistered.user": {
            $in: [userId]
        }, 
    }, {
        $set: {"userRegistered.$.checkAttendance.firstCheck": true}
    },{ 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function secondCheckAttendance(eventId, userId) {
    return Event.findOneAndUpdate({ 
        _id: eventId,
        "userRegistered.user": {
            $in: [userId]
        }, 
    }, {
        $set: {"userRegistered.$.checkAttendance.secondCheck": true}
    },{ 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function addStaff(eventId, userId, role) {
    return Event.findOneAndUpdate({ 
        _id: eventId,
        "userStaff.user" : { $nin: [ userId ] }, 
    }, {
        $push: { userStaff: [{ user: userId , role: role }] }
    },{ 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function deleteStaff(_id, userId) {
    return Event.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { eventStaff: userId }
    }, { 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function addScanner(_id, userId) {
    return Event.findOneAndUpdate({ 
        _id: _id,
        eventScanner: {
            $nin: [ userId ]
        }, 
    }, {
        $push: { eventScanner: userId }
    },{ 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function deleteScanner(_id, userId) {
    return Event.findOneAndUpdate({ 
        _id: _id,
    }, {
        $pull: { eventScanner: userId }
    }, { 
        new: true,
    }).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function postByUser(userPost) {
    return Event.find({userCreated: userPost}).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function registerdByUser(user) {
    return Event.find({ "userRegistered.user": {
        $in: [user]
    }}).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function postOfStaff(userPost) {
    return Event.find({"userStaff.user": {
        $in: [userPost]
    }}).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}

export function postOfScanner(userPost) {
    return Event.find({eventScanner: userPost}).populate('userRegistered.user', userDefaultData)
    .populate('eventStaff', userDefaultData)
    .populate('userChecked', userDefaultData)
    .populate('userCreated', userDefaultData)
    .populate('eventScanner', userDefaultData);
}