import * as HelperService from './helper.service';
// import defaultParam from '../params/default';
// import { isNumber } from 'util';
import { Types } from 'mongoose';

/**
 * filter url search by coordinate and radius
 */
// export function filterLocation(req, res, next) {
//     let { position, radius = 50 } = req.query;

//     if(position) {
//         let coordinate = HelperService.parseCoordinateFromQuery(position); 
        
//         if(coordinate !== false) {
//             req.query.location = coordinate;
//             req.query.radius = defaultParam.nearbyRadius;

//             next();
//         }
//         else res.status(400).send({error: "Location parameter not corrected format."});
//     }
//     else {
//         res.status(400).send({error: "Required location parameter. Like that : nearby?position=44.968046,-94.420307"});
//     } 
// }

/**
 * filter url paginator
 */
export function filterPaginator(req, res, next) {
    let { offsetId = null, pageSize = 11 } = req.query;    

    let valid = true;

    if(offsetId !== null && Types.ObjectId.isValid(offsetId) === false) valid = false;
    else if(offsetId === null) req.query.offsetId = offsetId;

    if(parseInt(pageSize) === NaN || pageSize <= 0) valid = false;
    else { 
        req.query.pageSize = parseInt(pageSize) <= 50 ? parseInt(pageSize) : 11;
    }

    valid == true ? next() : res.status(400).send({error: "Invaild request, required correct param. Like: ?offsetId=5cd69c35f42d263a2d53654e&pageSize=11"});
}