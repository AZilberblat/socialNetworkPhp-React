const { addUser, getUser } = require("./routes/api/room");
const { http } = require("./index");
const io = require("socket.io")(http);

io.on("connect", (socket) => {
  socket.on("join", ({ myroom, id }, callback) => {
    const { error, user } = addUser({ id: id, myroom });
    if (error) return callback(error);
    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (tuple, callback) => {
    const { ghistory, vs, stepNumber, id, myroom, other } = tuple;
    let room = myroom;

    try {
      const theUser = getUser(room, id);

      io.to(theUser.room).emit("message", {
        ghistory: ghistory,
        vs: vs,
        other: other,
        stepNumber: stepNumber,
      });
    } catch (error) {}

    callback();
  });
});

module.exports = io;
