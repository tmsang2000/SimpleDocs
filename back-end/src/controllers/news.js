import NewsService from "../services/news";
import UserService from "../services/user";
import _ from "lodash";

class NewsController {
    async create(req,res) {
        try {
            const role = await UserService.getUserRole(req.payload._id);
            if (role == "student" || role == "teacher") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
            const post = await NewsService.create({...req.body, postAt: new Date(), postBy: req.payload._id});
            return res.status(200).json({success: true, payload: post});
        } catch (err){
            console.log(err);
            return res.status(400).json({success: false});
        }
    }

    async update(req, res) {
        try {
            const postID = req.params.id;
            const post = await NewsService.getById(postID);
            if(req.payload._id != post.postBy ) {
                    return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                 })
            }
            if (req.body.createdAt) {
                delete req.body.createdAt;
            }
            if (req.body.writtenBy) {
                delete req.body.writtenBy;
            }
            const postUpdated = await NewsService.update(postID, req.body);
            return res.status(200).json({success: true, payload: postUpdated});
         } catch (err) {
            console.log(err);
            return res.status(400).json({success: false});
        }
    }

    async getAll(req, res) {
        try {
          const post = await NewsService.getAll();
          return res.status(200).json({ success: true, payload: post });
        } catch (err) {
          return res.status(400).json({ success: false });
        }
    }
    
    async getById(req, res) {
        try {
          const post = await NewsService.getById(req.params.id);
    
          return res.status(200).json({ success: true, payload: post });
        } catch (err) {
          return res.status(400).json({ success: false });
        }
    }

    async getByUserCreated(req, res) {
        try {
          const news = await NewsService.getAllByUserIdUserCreated(req.payload._id);
          return res.status(200).json({ success: true, payload: news });

        } catch (err) {
          return res.status(400).json({ success: false });
        }
    }
}

export default new NewsController();