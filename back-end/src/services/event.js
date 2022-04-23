import Event from "../models/event";
import UserService from "./user";
import { Types } from 'mongoose';

class EventService {

    async create(data) {
        const event = await Event.create(data);
        return event;
    }

    async getAll() {
        const events = await Event.find().populate('userCreated').populate('eventLeader');
        return events;
    }
    async getAllByUserIdUserCreated(userPost) {
        let events = await Event.find({userCreated: userPost}).populate('userCreated').populate('eventLeader')
        return events;
    }

    async addUserCheckIn(_id, userId) {
         console.log(_id, userId)
        return Event.findOneAndUpdate({ 
            _id: _id,
            userChecked: {
                $nin: [ userId ]
            }, 
        }, {
            $push: { userChecked: userId }
        }, { 
            new: true,
        }).populate('userChecked').populate('userCreated');
    }


    async unCheckinUser(_id, userId) {
        return Event.findOneAndUpdate({ 
            _id: _id,
        }, {
            $pull: { userChecked: userId }
        }, { 
            new: true,
        }).populate('userChecked').populate('userCreated');
    }

    async getAllByUserIdRegister(userPost) {
        // let events = Event.aggregate([
        //     { 
        //         $match :  { 
        //             userCreated : Types.ObjectId(userPost)
        //         }
        //     },])
        // events = await Event.populate(events,{path: 'userCreated'});
        return Event.aggregate([
            { 
                $match :  { 
                    userRegistered : Types.ObjectId(userPost)
                }
            },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userCreated',
                    foreignField: 'userCreated',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            // {
            //     $addFields: {
            //         numberInteractUser: {
            //             $size: "$interactUser"
            //         },
            //         numberOfComments: {
            //             $size: "$comments"
            //         },
            //         date: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
            //         createdDateAt: { $dateToString: { format: "%Y%m%d", date: "$createdAt" } },
            //     }
            // },
        ]);
    }

    async getAllByUserIdUserLead(userLead) {
        let events = await Event.find({eventLeader: userLead}).populate('userCreated').populate('eventLeader')
        return events;
    }

    async getById(id) {
        const event = await Event.findById(id);
        return event;
    }
      
    async update(id, data){
        const event = await Event.findByIdAndUpdate(id, data,{
          new: true,
          runValidators: true
        }).populate('eventLeader');
        return event;
    }
}

export default new EventService();