const { Socket } = require("socket.io")
const { tryJWT } = require("../helpers/generate-jwt")
const { ChatMessages } = require("../models")

const chatMessage = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
    const user = await tryJWT(socket.handshake.headers['x-token']);
    if (!user) {
        return socket.disconnect();
    }
    //Add user connected
    chatMessage.userConnect(user);
    io.emit('active-users', chatMessage.usersList);

    //Clean user disconnected
    socket.on('disconnect', () => {
        chatMessage.userDisconnect(user);
        io.emit('active-users', chatMessage.usersList);
    });
}

module.exports = {
    socketController
}