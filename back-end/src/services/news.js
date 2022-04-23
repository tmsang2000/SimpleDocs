import News from "../models/news";
import UserService from "./user";
import { Types } from 'mongoose';

class NewsService {

    async create(data) {
        const post = await News.create(data);
        return post;
    }

    async getAll() {
        const post = await News.find().populate('postBy');
        return post;
    }
    
    async getById(id) {
        const post = await News.findById(id);
        return post;
    }
      
    async getAllByUserIdUserCreated(userPost) {
        let news = await News.find({postBy: userPost}).populate('postBy')
        return news;
    }

    async update(id, data){
        const post = await News.findByIdAndUpdate(id, data,{
          new: true,
          runValidators: true
        });
        return post;
    }
}

export default new NewsService();