import { io } from "socket.io-client";

const socket = io("http://localhost:3054"); // backend port

export default socket;
