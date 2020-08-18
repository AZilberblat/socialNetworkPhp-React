const users = [];
const addUser = ({ id, myroom }) => {
  let room = myroom;

  const existingUser = users.find(
    (user) => user.room === room && user.id === id
  );
  if (!id || !room) return { error: "Username and room are required." };
  if (existingUser) {
    console.log("not added");
    return { user: existingUser };
  }
  console.log(room + " added");
  const user = { id, room };
  users.push(user);

  return { user };
};

const getUser = (myroom, id) =>
  users.find((user) => user.room === myroom && user.id === id);

module.exports = { addUser, getUser };
