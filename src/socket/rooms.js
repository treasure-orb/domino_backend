const rooms = [];

const addRoom = ({roomEmail, createPlayerEmail}, callback) => {
  var index = rooms.findIndex((room)=>room.roomEmail === roomEmail)
  if(index !== -1) return {err: "You have already created room!"}
  var isAlreadyJoinToRoom = false;
  rooms.map((room)=>{
    room.players.map((playerEmail)=>{
      if(playerEmail == createPlayerEmail) {
        isAlreadyJoinToRoom = true;
      }
    })
  })
  if(isAlreadyJoinToRoom) return {err: "You have already joined to the room. You can't create the new room!"}
  const room = { roomEmail, players: [{email: createPlayerEmail}]};

  rooms.push(room);

  return {room:room};

}

const removeRoom = (roomEmail) => {
  const index = rooms.findIndex((room) => room.roomEmail === roomEmail);

  if(index !== -1) return rooms.splice(index, 1)[0];
}

const getAllRooms = () => {
  return rooms;
}

const addPlayerInRoom = ({roomIndex,playerEmail}) => {
  var playerRoom;
  var isAlreadyJoinToRoom = false;
  rooms.map((room, index)=>{
    room.players.map((player)=>{
      if(player.email == playerEmail&&index!=roomIndex) {
        isAlreadyJoinToRoom = true;
      }
    })
  })
  if(isAlreadyJoinToRoom) return {err: "You have already joined to the room.",room: rooms[roomIndex]}
  rooms.map((room, index)=>{
    if(index == roomIndex) {
      playerRoom = room;
      var i = room.players.findIndex((player)=> player.email === playerEmail);
      if(i === -1) {
        room.players.push({email: playerEmail});
      }
    }
  })
  return {room:playerRoom};
}

const addPlayerIdinRoom = ({roomEmail, playerPosition, playerId}) => {
  var index = rooms.findIndex((room) => room.roomEmail == roomEmail);
  console.log(index);
  if(index !== -1) {
    rooms[index].players[playerPosition].id = playerId;
    console.log(playerId);
  }
}
const getRoomByEmail = (roomEmail) => {
  var playerRoom;
  rooms.map((room)=>{
    if(room.roomEmail == roomEmail) {
      playerRoom = room;
    }
  })
  return playerRoom;
}

const disconnectPlayerInGameRoom = (userId) => {
  var gameRoom;
  var playerPosition;
  rooms.map((room) => {
    var index = room.players.findIndex((player) => player.id == userId)
    if(index !== -1) {
      gameRoom = room;
      playerPosition = index + 1;
      room.players[index].online = false;
    }
  })
  if(playerPosition) return {roomEmail: gameRoom.roomEmail, userPosition: playerPosition};
  else return {roomEmail: null, userPosition: null}
}
module.exports = { addRoom, removeRoom, getAllRooms, addPlayerInRoom,addPlayerIdinRoom,  getRoomByEmail, disconnectPlayerInGameRoom};