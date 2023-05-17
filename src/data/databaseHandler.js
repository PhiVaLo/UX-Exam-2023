const db = require('better-sqlite3')('database', {verbose: console.log});
//const descriptions = db.prepare("SELECT user_id FROM users WHERE first_name = 'Kasper'");
//const rooms = db.prepare("SELECT ALL * FROM rooms");
const addNewRoom = (roomName, roomType) => db.prepare(`INSERT INTO rooms (room_name, room_type) VALUES ('${roomName}', '${roomType}')`);
db.prepare("DELETE * rooms WHERE ()")
//addNewRoom("Omars træhus", "hus").run();

//let roomObjects = rooms.all();

//console.log(addNewRoom("2A05").run());