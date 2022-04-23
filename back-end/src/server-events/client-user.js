import _ from 'lodash';
import * as UserService from '../services/user.service';
import { EventTypes } from './event-types';


class ClientUser {
    constructor(userId) {
        this.sockets = {};
        this.userData = {};

        UserService.getOne(userId).then(data => this.userData = data);
        this.onDisconnect = this.onDisconnect.bind(this);
    }

    registerSocket(socket) {
        this.sockets[socket.id] = socket;
        socket.on(EventTypes.DISCONNECT, (reason) => this.onDisconnect(socket, reason))
    }

    notifyClient(data) {
        _.forEach(this.sockets, socket => {
            socket.emit(EventTypes.NOTIFY, data);
        });
    }

    onDisconnect(socket, reason) {
        console.log('Disconnect from: ', socket.id);
        console.log('reason: ', reason);
        console.log('User data: ', this.userData.username);

        delete this.sockets[socket.id];
    }
}

export default ClientUser;