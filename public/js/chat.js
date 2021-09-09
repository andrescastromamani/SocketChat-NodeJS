const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:3000/api/auth/'
    : 'https://acm-restserver-nodejs.herokuapp.com/api/auth/';

let user = null;
let socket = null;
//Html References
const textUid = document.querySelector('#textUid');
const textMessage = document.querySelector('#textMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout = document.querySelector('#btnLogout');

const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if (token.length < 10) {
        window.location = 'index.html';
        throw new Error('Not exist token in the server')
    }
    const resp = await fetch(url, {
        headers: { 'x-token': token }
    })
    const { user: userDB, token: tokenDB } = await resp.json();
    console.log(userDB, tokenDB);
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();
}
const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });
    socket.on('connect', () => {
        console.log('Connected');
    });
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
    socket.on('receive-message', () => {

    });
    socket.on('active-users', () => {

    });
    socket.on('private-message', () => {
        
    });
}
const main = async () => {
    await validateJWT();
}
main();
//const socket = io();