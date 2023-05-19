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

function getUserEmail(email) {
    const userEmail = db.prepare(`SELECT * FROM users WHERE email = '${email}'`);
    return userEmail.get();
}

function getUserEmailAndPasscode(email, passcode){
    const userEmail = getUserEmail(email);
    const userPasscode = db.prepare(`SELECT * FROM users WHERE passcode = '${passcode}'`);
    return {userEmail, userPasscode};
}

/*function addUser(user){
    db.prepare(`INSERT INTO users (first_name, email, passcode, role) VALUES ('${user.first_name}', '${user.email}', '${user.passcode}', '${user.role}')`).run();
    //db.prepare("INSERT INTO users (first_name, email, passcode, role) VALUES (?, ?, ?, ?)").run(user.first_name, user.email, user.passcode, user.role);
    db.prepare("INSERT INTO users (first_name, email, passcode, role) VALUES (?, ?, ?, ?)")
        .run(user.first_name, user.email, user.passcode, user.role);
}*/
function addUser(user) {
    db.prepare('INSERT INTO users (first_name, email, passcode, role) VALUES (?, ?, ?, ?)')
        .run(user.first_name, user.email, user.passcode, user.role);
}

function getAllUniversityNames(){
    return db.prepare('SELECT ALL (university_name) FROM universities').all();
}

function addNewUniversity(university){
    db.prepare(`INSERT INTO universities (university_name) VALUES('${university.university_name}') `).run();
}

function userEmailExist(email){
    return db.prepare('SELECT * FROM users WHERE email = ?').run(email);
}

function userExist(email, passcode){
    return db.prepare('SELECT * FROM users WHERE email = ? AND passcode = ?').get(email, passcode);
}

module.exports.userExist = userExist;
module.exports.userEmailExist = userEmailExist;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.getUserEmail = getUserEmail;
module.exports.getUserEmailAndPasscode = getUserEmailAndPasscode;
module.exports.getAllUniversityNames = getAllUniversityNames;
module.exports.addNewUniversity = addNewUniversity;