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
  var isAlreadyJoinToRoom = false;
  rooms.map((room, index)=>{
    room.players.map((Email)=>{
      if(Email == playerEmail&&index!=roomIndex) {
        isAlreadyJoinToRoom = true;
      }
    })
  })
  if(isAlreadyJoinToRoom) return {err: "You have already joined to the room.",room: rooms[roomIndex]}
  rooms.map((room, index)=>{
    if(index == roomIndex) {
      playerRoom = room;
      var i = room.players.findIndex((email)=> email === playerEmail);
      if(i === -1) {
        room.players.push(playerEmail);
      }
    }
  })
  return {room:playerRoom};
}
const getRoomByEmail = (roomEmail) => {
  var playerRoom;
  rooms.map((room)=>{
    if(room.roomEmail == roomEmail) {
      console.log(room)
      playerRoom = room;
    }
  })
  return playerRoom;
}
module.exports = { addRoom, removeRoom, getAllRooms, addPlayerInRoom, getRoomByEmail};