const { Socket } = require("socket.io")
const { tryJWT } = require("../helpers/generate-jwt")

const socketController = async (socket = new Socket()) => {
    const user = await tryJWT(socket.handshake.headers['x-token']);
    if (!user) {
        return socket.disconnect();
    }
    console.log(user.name, 'connected');
}

module.exports = {
    socketController
}