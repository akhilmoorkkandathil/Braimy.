const { Server } = require("socket.io");
const chatController = require("../controllers/chatController");
const Chat = require("../models/chatModel");

const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.BASE_URL_CLIENT,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket.io user connectedm - util socket.js");
    socket.emit("Server sended to the client without any request")

    socket.on("joinChat", ({ id, userType }) => {
      if (userType === "Tutor") {
        socket.join(id);
        console.log("Tutor joined");
      } else {
        socket.join(id);
        console.log("Student joined");
        //onlineUsers.set(id, socket.id);
        //console.log(`onlineUsers: ${Array.from(onlineUsers.keys())}`);
      }
      //io.to("admin").emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", async ({ userId,tutorId,senderType, message }) => {
      console.log(userId,tutorId);
      const chatMessage = new Chat({
        userId,
        tutorId,
        senderType,
        message,
      });
      await chatMessage.save();

      if (senderType === "Admin") {
        console.log("admin sends message to user: ", userId);
        io.to(userId).emit("messageReceived", {
          userId: chatMessage.userId,
          senderType: chatMessage.senderType,
          message: chatMessage.message,
          createdAt: chatMessage.createdAt,
        });
      } else {
        io.to(tutorId).emit("messageReceived", {
          userId: chatMessage.userId,
          senderType: chatMessage.senderType,
          message: chatMessage.message,
          createdAt: chatMessage.createdAt,
        });
      }
    });

    socket.on("joinVideoCall", ({ userId, userType, roomId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined video call room ${roomId}`);
      socket.to(roomId).emit("userJoined", { userId, userType });
    });

    socket.on("sendVideoMessage", (payload) => {
      console.log("hello inside sendVideoMessage: ", payload);
      const { roomId, ...data } = payload;
      console.log(`check data:`, data);

      console.log("inside sendVideoMessage Socket connection", roomId);
      socket.to(roomId).emit("videoMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      });
      io.to("admin").emit("onlineUsers", Array.from(onlineUsers.keys()));

      console.log("Socket.io user disconnected");
    });

    chatController.handleMessage(socket);
  });
  return io;
};

module.exports = initializeSocket;
