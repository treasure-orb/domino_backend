const users = [];

const addUser = ({ id, email}) => {

  const existingUser = users.find((user) => user.email === email);

  if(!email) return { error: 'Username and room are required.' };
  
  if(existingUser) return { error: 'Email is taken.' };

  const user = { id, email };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getAllUsers = () => {
  return users;
}

module.exports = { addUser, removeUser, getAllUsers };