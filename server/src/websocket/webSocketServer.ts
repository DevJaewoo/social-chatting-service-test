import { Server } from "socket.io";
import http from "http";
import {
  ClientEvent,
  InternalEvent,
  ServerEvent,
  UserInfo,
} from "./socketConstants.js";

const webSocketServer = (httpServer: http.Server) => {
  const wsServer = new Server<
    ClientEvent,
    ServerEvent,
    InternalEvent,
    UserInfo
  >(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  wsServer.on("connection", (socket) => {
    socket.onAny((event) =>
      console.log(`Socket event(${socket.data}): ${JSON.stringify(event)}`)
    );

    socket.on("login", (userInfo: UserInfo) => {
      console.log(userInfo);
      socket.data = userInfo;
    });
  });
};

export default webSocketServer;
