import { Router } from 'express';
import { verifyJWT_MW } from '../services/auth.service';
import { filterPaginator } from '../services/filter.service';
import * as SearchService from '../services/search.service';
// import * as PlaceService from '../services/place.service';
import _ from 'lodash';

const router = Router();

/**
 * Filter BEFORE handling
 */
router.all('*', verifyJWT_MW);
router.get('/', filterPaginator);

/**
 * Searching all
 */
router.get('/', (req, res) => {
    let keyword = req.query.keyword;
    console.log("Asas")
    if(keyword == undefined || keyword === "") {
        res.status(400).send({error: "Require parameter keyword Ex:?keyword=xxx"})
    }
    else {
        // SearchService.searchUser(keyword, req.query.pageSize, req.query.offsetId).then(data => res.send(data));       
        SearchService.searchUser(keyword).then(data => res.send(data));       
    }
});

/**
 * Seaching place by name
 */
router.get('/place', (req, res) => {
    let keyword = req.query.keyword;

    if(keyword == undefined || keyword === "") {
        res.status(400).send({error: "Require parameter keyword Ex:?keyword=xxx"})
    }
    else {
        SearchService.searchPlace(keyword).then(places => { return places }).then(places => {
            if(places.length != 0) {
                PlaceService.getNumberPostAtLocation(places).then(data => res.send(data))
            }
            else {
                res.send(places)
            }
        })
    }
});


export default router;