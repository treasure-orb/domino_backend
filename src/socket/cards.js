const cards = [];

const addRoomCards = ({roomEmail, gameCards}, callback) => {
  var index = cards.findIndex((roomCards) => roomCards.roomEmail === roomEmail)
  if(index !== -1) {
    cards.map((roomCards) => {
      if(roomCards.roomEmail == roomEmail) {
        roomCards.orginalCards = gameCards
      }
    })
  }
  else{
    cards.push({roomEmail, orginalCards: gameCards});
  }
  return cards;
}

const randomRoomCards = ({roomEmail}) => {
  var RoomCards = cards.find((roomCards) => roomCards.roomEmail === roomEmail);
  var j, temp, i;
  for (i = RoomCards.orginalCards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = RoomCards.orginalCards[i];
      RoomCards.orginalCards[i] = RoomCards.orginalCards[j];
      RoomCards.orginalCards[j] = temp;            
  }
  return RoomCards.orginalCards;
}

  

module.exports = { addRoomCards, randomRoomCards };