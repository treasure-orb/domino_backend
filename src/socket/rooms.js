const rooms = [];

const addRoom = ({roomEmail, createPlayerEmail}) => {

  const room = { roomEmail, players: [createPlayerEmail]};

  rooms.push(room);

  return room ;

}

const removeRoom = (roomEmail) => {
  const index = rooms.findIndex((room) => room.roomEmail === roomEmail);

  if(index !== -1) return rooms.splice(index, 1)[0];
}

const getAllRooms = () => {
  return rooms;
}

module.exports = { addRoom, removeRoom, getAllRooms};