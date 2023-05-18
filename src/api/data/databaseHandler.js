const db = require('better-sqlite3')(__dirname+'/database', {verbose: console.log});
//const descriptions = db.prepare("SELECT user_id FROM users WHERE first_name = 'Kasper'");
//const rooms = db.prepare("SELECT ALL (room_name) FROM rooms");
//console.log(rooms.all());
//const addNewRoom = (roomName, roomType) => db.prepare(`INSERT INTO rooms (room_name, room_type) VALUES ('${roomName}', '${roomType}')`);
//db.prepare("DELETE * rooms WHERE ()")
//addNewRoom("Omars træhus", "hus").run();

//let roomObjects = rooms.all();

//console.log(addNewRoom("2A05").run());

function getUser(id) {
    const user = db.prepare(`SELECT * FROM users WHERE user_id = '${id}'`);
    return user.get();
}

function addUser(user){
    console.log(user);
    db.prepare(`INSERT INTO users (first_name, last_name, role) VALUES ('${user.first_name}', '${user.last_name}', '${user.role}')`).run();
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;