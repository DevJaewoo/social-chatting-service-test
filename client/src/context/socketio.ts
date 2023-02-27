import React from "react";
import io, { Socket } from "socket.io-client";
import { ClientEvent, ServerEvent } from "src/socketConstants";

export const socket: Socket<ServerEvent, ClientEvent> = io(
  "http://localhost:5000"
);
export const SocketContext =
  React.createContext<Socket<ServerEvent, ClientEvent>>(socket);
