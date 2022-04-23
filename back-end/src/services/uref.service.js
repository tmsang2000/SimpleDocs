import UserRef from '../models/uref.model';

export function findOne(type, refId) {
    return UserRef.findOne({
        $and: [
            { refType: type },
            { refId: refId },
        ]
    });
}

export function add(type, refId, user) {
    return UserRef.create({
        refType: type,
        refId: refId,
        user: user
    })
}