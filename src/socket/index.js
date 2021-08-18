const { addUser, removeUser,getAllUsers } = require('./users');
const { addRoom, removeRoom, getAllRooms, addPlayerInRoom} = require('./rooms');

const connection = (app, io) => {
    io.on('connection', function (socket) {
      console.log('Connected');
      socket.on('join', ({ email }) => {
        socket.join('Player-List');
        addUser({ id: socket.id, email });  
        const users = getAllUsers();
        const rooms = getAllRooms();
        io.to('Player-List').emit('showUsers', users);
        io.to('Player-List').emit('showRooms', rooms);  
      });
      socket.on('createRoom', ({ roomEmail, createPlayerEmail })=>{
        socket.join('room: '+ roomEmail);
        const room = addRoom({roomEmail, createPlayerEmail});
        io.to("room: "+roomEmail).emit('sameRoomPlayers', room.players);
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
      })
      socket.on('deleteRoom', ({roomEmail})=>{
        removeRoom(roomEmail);
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
      })
      socket.on('disconnect', () => {
        console.log('1111111111111111')
        removeUser(socket.id);
        const users = getAllUsers();
        io.to('Player-List').emit('showUsers', users);
      });
    })    
}

module.exports = connection