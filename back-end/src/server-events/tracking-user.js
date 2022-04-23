class TrackingUser {
    constructor() {
        this.userIsConnecting = [];
    }

    addUserConnecting(socketId, userId) {
        this.userIsConnecting.push({
            userId: userId,
            socketId: socketId
        });
    }

    removeUserConnecting(socketId) {
        this.userIsConnecting = this.userIsConnecting.filter(val => val.socketId !== socketId);
    }

    getUserConnecting() {
        return this.userIsConnecting;
    }
}

export default TrackingUser;