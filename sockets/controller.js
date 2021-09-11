const { Socket } = require("socket.io")
const { tryJWT } = require("../helpers")
const { ChatMessages } = require("../models")

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
    const user = await tryJWT(socket.handshake.headers['x-token']);
    if (!user) {
        return socket.disconnect();
    }
    //Add user connected
    chatMessages.userConnect(user);
    io.emit('active-users', chatMessages.usersList);

    //Clean user disconnected
    socket.on('disconnect', () => {
        chatMessages.userDisconnect(user.id);
        io.emit('active-users', chatMessages.usersList);
    });
}

module.exports = {
    socketController
}