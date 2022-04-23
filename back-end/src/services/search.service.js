import User from '../models/user.model';
import Event from '../models/event.model';
import { Types } from 'mongoose';
import _ from 'lodash';

export function searchUser(username) {
    return User.find({
        $text: { $search: username } 
    }, {
        profilePicture: 1,
        firstName: 1,
        lastName: 1
    });
}

// export function searchPost(content) {
//     return Post.find({
//         $text: { $search: content } 
//     }, {
//         content: 1,
//         userPost: 1,
//         placeId: 1,
//         media: 1,
//     }).limit(10);
// }

export function searchEvent(keyword) {
    let now = new Date()
    return Event.aggregate([
        {
            $match: {
                $text: { $search: keyword } 
            }
        },
        {
            $match: {
                $expr: {
                    $and: [
                        { $gt: ["$createdForm.maxRegister", { $size: "$userRegistered" } ]},
                        { $gt: ["$createdForm.formEnd", { $dayOfYear: now} ]}
                    ]
                }
            }
        },
        {
            $addFields: {
                registerBalance: { $subtract: ["$createdForm.maxRegister", { $size: "$userRegistered" } ]}
            }
        },
        {
            $sort: {
                "createdForm.formEnd" : 1,
                registerBalance : -1,
                "createdForm.eventStart": 1,
                "createdForm.socialDays" : -1
            }
        }
    ])
}

export function searchPostByKeyword(keyword, pageSize, offsetId) {
    return new Promise((resolve, reject) => {
        let promiseSearching = [];
        let users = [];
        let posts = [];
        let places = [];

        promiseSearching.push(searchUser(keyword));

        Promise.all(promiseSearching).then(data => {
            users = data[0];
            posts = data[1];
            places = data[2];

            Post.aggregate([
                {
                    $match: {
                        $or: [
                            { userPost: { $in: users.map(x => x._id) } },
                            { _id: { $in: posts.map(x => x._id) } },
                            { placeId: { $in: places.map(x => x._id) } }
                        ]
                    }
                },
                {
                    $sort: {
                        atTime: -1
                    }
                },
                {
                    $lookup: {
                        from: 'user',
                        localField: 'userPost',
                        foreignField: '_id',
                        as: 'userPost'
                    }
                },
                {
                    $unwind: "$userPost"
                },
                {
                    $lookup: {
                        from: 'place',
                        localField: 'placeId',
                        foreignField: '_id',
                        as: 'placeId'
                    }
                },
                {
                    $unwind: "$placeId"
                },
                {
                    $lookup: {
                        from: 'post',
                        let: { placeId: "$placeId._id"},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$placeId", "$$placeId"] },
                                            // { $gte: [ "$createdAt", new Date((new Date()).getTime()- 1000 * 60 * 60 * 3) ] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'activePosts'
                    }
                },
                {
                    $addFields: {
                        peopleVisiting: {
                            $size: {
                                $setUnion: {
                                    $map: {
                                        input: "$activePosts",
                                        as: "post",
                                        in: "$$post.userPost" 
                                    }
                                }
                            }
                           
                        },
                    }
                },
                {
                    $project: {
                        _id: 1,
                        media: 1,
                        placeId: {
                            _id: 1,
                            name: 1,
                            location: 1
                        },
                        content: 1,
                        atTime:  1,
                        userPost: {
                            profilePicture: 1,
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            isPublished: 1 
                        },
                        interactUser: 1,
                        createdAt: 1,
                        peopleVisiting: 1
                    },
                },
                {
                    $match: {
                        $expr: {
                            $cond: {
                                if: { $not: [ {$eq: [null, offsetId] } ] }, 
                                then: {
                                    $lte: ["$_id", Types.ObjectId(offsetId)]
                                }, 
                                else: {
                                    
                                }
                            }
                        }
                        
                    }
                },
                {
                    $limit: pageSize
                }
            ]).then(data => {
                resolve(data);
            });
        });
    })
}