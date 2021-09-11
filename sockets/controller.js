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
    socket.emit('receive-message', chatMessages.latestMessages);

    //Clean user disconnected
    socket.on('disconnect', () => {
        chatMessages.userDisconnect(user.id);
        io.emit('active-users', chatMessages.usersList);
    });
    //Receive message
    socket.on('send-message', ({ uid, message }) => {
        chatMessages.sendMessage(user.id, user.name, message);
        io.emit('receive-message', chatMessages.latestMessages);
    })
}

module.exports = {
    socketController
}