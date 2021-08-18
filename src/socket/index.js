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
      socket.on('createRoom', ({ roomEmail, createPlayerEmail }, callback)=>{
        const {err, room} = addRoom({roomEmail, createPlayerEmail}, callback);
        if(err) return callback(err);
        socket.join('room: '+ roomEmail);
        io.to("room: "+roomEmail).emit('sameRoomPlayers', room);
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
      })
      socket.on('deleteRoom', ({roomEmail})=>{
        removeRoom(roomEmail);
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
      })
      socket.on('disconnect', () => {
        removeUser(socket.id);
        const users = getAllUsers();
        io.to('Player-List').emit('showUsers', users);
      });
      socket.on('joinPlayerInRoom', ({roomIndex, playerEmail})=>{
        const room = addPlayerInRoom({roomIndex, playerEmail});
        const rooms = getAllRooms();
        io.to('Player-List').emit('showRooms', rooms);
        socket.join('room: '+ room.roomEmail);
        io.to("room: "+room.roomEmail).emit('sameRoomPlayers', room);
      })
    })    
}

module.exports = connection