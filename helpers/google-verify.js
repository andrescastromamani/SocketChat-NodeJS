const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (id_token = '') => {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const {
        name: name,
        email: email,
        picture: image } = ticket.getPayload();
    return { name, email, image };
}

module.exports = {
    googleVerify,
}