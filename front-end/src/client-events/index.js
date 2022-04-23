import io from "socket.io-client";
// import { BASE_URL } from "../config";
import { EventTypes } from "./event-types";
import _ from "lodash";

let socket = null;
let listeners = {};

function registerNotifyListener(componentId, callback) {
  listeners[componentId] = callback;
}

function onReceiveNotify(data) {
  console.log("[DB] receive noti ", data);
  _.forEach(listeners, notifyFunc => notifyFunc(data));
}

function onDisconnect() {
  console.log("[DB]", "Disconnected from server");
}

function disconnect() {
  console.log("Dissssssss")
  socket.disconnect();
}

function connectToServer(token) {
  return new Promise((resolve, reject) => {
    console.log("Connect to server", token);
    // TODO: change to real server when release
    socket = io("http://localhost:3030");

    socket.on("connect", () => {
      socket.on(EventTypes.AUTHENTICATE, response => {
        console.log("[DB] connect response ", response);

        if (response.success) {
          socket.on(EventTypes.NOTIFY, onReceiveNotify);
        }
      });

      socket.on("disconnect", onDisconnect);
      socket.emit(EventTypes.AUTHENTICATE, token);
    });
  });
}

// ClientEventSystem.connectToServer(token);

export const ClientEventSystem = {
  connectToServer,
  registerNotifyListener,
  disconnect
};
