const rooms = [];

const addRoom = ({roomEmail, createPlayerEmail}, callback) => {
  var index = rooms.findIndex((room)=>room.roomEmail === roomEmail)
  if(index !== -1) return {err: "You have already created room!"}
  const room = { roomEmail, players: [createPlayerEmail]};

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
  rooms.map((room, index)=>{
    if(index == roomIndex) {
      playerRoom = room;
      var i = room.players.findIndex((email)=> email === playerEmail);
      if(i === -1) {
        room.players.push(playerEmail);
      }
    }
  })
  return playerRoom;
}

module.exports = { addRoom, removeRoom, getAllRooms, addPlayerInRoom};