const socketIo = require("socket.io");

function setupSocket(server) {
  const io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("subscribeToJobs", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
}

function notifyNewJobs(io, userId, job) {
  io.to(userId).emit("newJob", job);
}

module.exports = { setupSocket, notifyNewJobs };
