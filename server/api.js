import { Server } from "socket.io";
import { getTimer, setTimer, deleteTimer } from "./db.js";
import { isValidTimerId, isValidTimestamp } from "./validation.js";

const ROOM_NAMESPACE = "timers";
const CHANGE_EVENT = "timer change";
const ERROR_EVENT = "timer error";

const io = new Server();

io.on("connection", function (socket) {
  if (!isValidTimerId(socket.handshake.query.timerId)) {
    socket.emit(ERROR_EVENT);
    return;
  }

  const timerId = socket.handshake.query.timerId.toLowerCase();
  const roomId = `${ROOM_NAMESPACE}/${timerId}`;

  socket.join(roomId);

  if (getTimer(timerId)) {
    socket.emit(CHANGE_EVENT, getTimer(timerId));
  }

  socket.on(CHANGE_EVENT, (message) => {
    if (isValidTimestamp(message.endTime)) {
      io.to(roomId).emit(CHANGE_EVENT, setTimer(timerId, message.endTime));
    }
  });
});

io.of("/").adapter.on("delete-room", (roomId) => {
  if (roomId.startsWith(ROOM_NAMESPACE)) {
    // all clients have disconnected so delete timer
    const timerId = roomId.split("/")[1];
    deleteTimer(timerId);
  }
});

export default io;
