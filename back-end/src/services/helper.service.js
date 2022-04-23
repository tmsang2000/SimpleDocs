import config from '../config';
import Crypto from 'crypto';

/**
 * hashing password
 * @param {string} password 
 */
export function hashingPassword(password) {
    let hashedPassword = config.PASSWORD_SCERET_KEY + password;
    
    return Crypto.createHash('md5').update(hashedPassword).digest('hex');
}

/**
 * 
 * @param {string} coordinate string from URL query
 */
export function parseCoordinateFromQuery(location) {
    //validate location param.
    let coor = location.split(",").map(x => parseFloat(x)).filter(x => !Number.isNaN(x));
        
    if(coor.length == 2)  return coor;
    else return false;
}