import { Server } from "socket.io";

const webSocketServer = (wsServer: Server) => {
  wsServer.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Socket event: ${event}`));
  });
};

export default webSocketServer;
