const messageUsers = [];

const addMessageUser = (email) => {

  const existingMessageUser = messageUsers.find((user) => user.email === email);

  if(!email) return { error: 'Email are required.' };
  if(existingMessageUser) return { error: 'Email is taken.' };

  const user = { email, messages:[] };

  messageUsers.push(user);

  return { user };
}


const addMessage = ({newMessage, playerEmail, chatPartnerEmail}) => {
  messageUsers.map((user)=>{
    if(user.email==playerEmail) {
      var isEmailServive = false;
      user.messages.map((message)=>{
        if(message.email == chatPartnerEmail) {   
          isEmailServive = true;       
          message.msgs.push({email: playerEmail, msg: newMessage})
        }
      })
      if(!isEmailServive) user.messages.push({email: chatPartnerEmail, msgs: [{email:playerEmail, msg:newMessage}]});
    }
    if(user.email==chatPartnerEmail) {
      var isEmailServive = false;
      user.messages.map((message)=>{
        if(message.email == playerEmail) {   
          isEmailServive = true;       
          message.msgs.push({email: playerEmail, msg: newMessage})
        }
      })
      if(!isEmailServive) user.messages.push({email: playerEmail, msgs: [{email:playerEmail, msg:newMessage}]});
    }
  })

}

const getUserMessages = ({playerEmail, partnerEmail}) => {
  var userMessages;
  messageUsers.map((user)=>{
    if(user.email == playerEmail) {
      user.messages.map((message)=>{
      if(message.email == partnerEmail) {
          userMessages = message.msgs;
        }
      })
    }
  })
  return userMessages
}

module.exports = { addMessageUser, addMessage, getUserMessages };