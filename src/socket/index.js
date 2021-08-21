const { addUser, removeUser,getAllUsers } = require('./users');
const { addRoom, removeRoom, getAllRooms, addPlayerInRoom, getRoomByEmail} = require('./rooms');
const { addMessageUser, addMessage, getUserMessages} = require('./message');
const { addRoomCards, randomRoomCards } = require('./cards');
const connection = (app, io) => {
    io.on('connection', function (socket) {
      console.log('Connected');
      //handle when player join to gameroom
      socket.on('join', ({ email }) => {
        socket.join("PlayerEmail: " + email);
        socket.join('Player-List');
        socket.join("chat: " + email);
        addUser({ id: socket.id, email }); 
        addMessageUser(email); 
        const users = getAllUsers();
        const rooms = getAllRooms();
        io.to('Player-List').emit('showUsers', users);
        io.to('Player-List').emit('showRooms', rooms);  
      });
      //handle for creating gameroom
      socket.on('createRoom', ({ roomEmail, createPlayerEmail }, callback)=>{
        const {err, room} = addRoom({roomEmail, createPlayerEmail}, callback);
        if(err) return callback(err);
        socket.join('room: ' + roomEmail);
        io.to("room: " + roomEmail).emit('sameRoomPlayers', room);
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
      })
      //handle for deleting gameroom
      socket.on('deleteRoom', ({roomEmail})=>{
        removeRoom(roomEmail);
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
      })
      //handle when player disconnect
      socket.on('disconnect', () => {
        removeUser(socket.id);
        const users = getAllUsers();
        io.to('Player-List').emit('showUsers', users);
      });
      //handle for adding the player to the gameroom
      socket.on('joinPlayerInRoom', ({roomIndex, playerEmail}, callback)=>{
        const {err,room} = addPlayerInRoom({roomIndex, playerEmail});        
        if(err) {
          socket.join('room: ' + room.roomEmail);
          io.to("room: " + room.roomEmail).emit('sameRoomPlayers', room);
          return callback(err);
        }
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
        socket.join('room: ' + room.roomEmail);
        io.to("room: " + room.roomEmail).emit('sameRoomPlayers', room);
      })
      //handle for displaying player's message
      socket.on('sendMessage', ({newMessage, playerEmail, chatPartnerIndex})=>{
        const users = getAllUsers();
        const chatPartnerEmail = users[chatPartnerIndex].email;
        addMessage({newMessage, playerEmail, chatPartnerEmail });
        const playerMessages = getUserMessages({playerEmail: playerEmail, partnerEmail:chatPartnerEmail});
        io.to("chat: " + playerEmail).emit("showMessages", playerMessages);
      })
      //handle for displaying partner's message
      socket.on('showPartnerMessage', ({playerEmail, chatPartnerIndex})=>{
        const users = getAllUsers();
        const chatPartnerEmail = users[chatPartnerIndex].email;
        socket.join("chat: " + chatPartnerEmail);
        const partnerMessages = getUserMessages({playerEmail: playerEmail, partnerEmail:chatPartnerEmail});
        io.to("chat: " + playerEmail).emit("showMessages", partnerMessages);
      })
      //handle when player click 'Start' button
      socket.on('startBtnClick', ({roomEmail}) => {
        const room = getRoomByEmail(roomEmail);
        room.players.map((playerEmail, index) => {
          io.to('PlayerEmail: '+playerEmail).emit('setPosition', {position: index+1});
        })
        io.to('room: '+roomEmail).emit('startGame', roomEmail );
      })

      socket.on('join-game-room', ({roomEmail, position}) => {
        socket.join('playing-room: '+ roomEmail);
        socket.join('playing-room: '+ roomEmail+'&position: ' + position);
      })

      socket.on("set-gamecards", ({gameCards, roomemail}) => {
        addRoomCards({roomEmail: roomemail, gameCards});
        const playerCards = randomRoomCards({roomEmail: roomemail});
        io.to('playing-room: '+ roomemail).emit('apply-gamecards', {playerCards});
      })

      socket.on('selectCard', ({cardNumber, roomEmail})=> {
        io.to('playing-room: '+ roomEmail).emit('throwCard', {cardNumber});
      })
      
    })    
}

module.exports = connection