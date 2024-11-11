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
    const user = db.prepare(`SELECT * FROM users WHERE user_id = ?`);
    return user.get(id);
}

function getUserEmail(email) {
    const userEmail = db.prepare(`SELECT * FROM users WHERE email = ?`);
    return userEmail.get(email);
}

function getUserEmailAndPasscode(email, password){
    const userEmail = getUserEmail(email);
    const userPasscode = db.prepare(`SELECT * FROM users WHERE password = ?`)
        .get(password);
    return {userEmail, userPasscode};
}

/*function addUser(user){
    db.prepare(`INSERT INTO users (first_name, email, passcode, role) VALUES ('${user.first_name}', '${user.email}', '${user.passcode}', '${user.role}')`).run();
    //db.prepare("INSERT INTO users (first_name, email, passcode, role) VALUES (?, ?, ?, ?)").run(user.first_name, user.email, user.passcode, user.role);
    db.prepare("INSERT INTO users (first_name, email, passcode, role) VALUES (?, ?, ?, ?)")
        .run(user.first_name, user.email, user.passcode, user.role);
}*/
function addUser(user) {
    db.prepare('INSERT INTO users (name, email, password, role, university_id) VALUES (?, ?, ?, ?, ?)')
        .run(user.name, user.email, user.password, user.role, user.university_id);
}

function getAllUniversityNames(){
    return db.prepare('SELECT ALL (university_name) FROM universities')
        .all();
}

function addNewUniversity(university){
    db.prepare(`INSERT INTO universities (university_name) VALUES(?) `)
        .run(university.university_name);
}

function getBookingsByUserID(userId, timeFrom, timeTo) {
   return db.prepare('SELECT ALL * FROM bookings WHERE owner_id = ? AND (date_time > ? AND date_time < ?)')
       .all(userId, timeFrom, timeTo);
}

function getBookingByUserID(userId, bookingId) {
    return db.prepare('SELECT * FROM bookings WHERE owner_id = ? AND booking_id = ?')
        .get(userId, bookingId);
}

module.exports.deleteUserByID = function (userId) {
    return db.prepare('DELETE * FROM bookings WHERE user_id = ?').get(userId);
}

 module.exports.deleteBooking = function (bookingId) {
    db.prepare('DELETE FROM bookings WHERE booking_id = ?')
        .run(bookingId);
    db.prepare('DELETE FROM booking_details WHERE booking_id = ?')
        .run(bookingId);
}

function userEmailExist(email){
    return db.prepare('SELECT * FROM users WHERE email = ?')
        .get(email);
}

function userExist(email, passcode){
    return db.prepare('SELECT * FROM users WHERE email = ? AND password = ?')
        .get(email, passcode);
}

function getAmountOfBookingsByUniversity(universityId){
    const bookings = db.prepare('SELECT ALL FROM bookings WHERE university_id = ?')
        .all(universityId);
    return bookings.length;
}

function getBookingByUniversity (universityId){
    return db.prepare('SELECT * FROM bookings WHERE university_id = ?')
        .get(universityId);
}

module.exports.getBooking = function (bookingId) {
    return db.prepare('SELECT * FROM bookings WHERE booking_id = ?')
        .get(bookingId);
}

module.exports.getRoom = function getRoom(roomId){
    return db.prepare('SELECT * FROM rooms WHERE room_id = ?')
        .get(roomId);
}

module.exports.addRoom = function addRoom(room){
    db.prepare('INSERT INTO rooms (name, location_id, restriction, university_id) VALUES (?, ?, ?, ?)')
        .run(room.name, room.location_id, room.restriction, room.university_id);
}

module.exports.getAllBookingsByRoom = function getAllBookingsByRoom(roomId, timeFrom, timeTo){
    return db.prepare('SELECT ALL * FROM bookings WHERE room_id = ? AND (date_time > ? AND date_time < ?)')
        .all(roomId, timeFrom, timeTo);
}

module.exports.getBookingByRoom = function getBookingByRoom(roomId, bookingId){
    return db.prepare('SELECT * FROM bookings WHERE room_id = ? AND booking_id = ?')
        .get(roomId, bookingId);
}

function addBooking(booking){
    db.prepare('INSERT INTO bookings (room_id, owner_id, description, date_time, university_id, duration) VALUES (?, ?, ?, ?, ?, ?)')
        .run(booking.room_id, booking.owner_id, booking.description, booking.date_time, booking.university_id, booking.duration);
    return db.prepare('SELECT last_insert_rowid()')
        .get();
}

module.exports.addNewBookingDetail = function addNewBookingDetail(booking_detail){
    return db.prepare('INSERT INTO booking_deatils (user_id, booking_id) VALUES (?, ?)')
        .run(booking_detail.user_id, booking_detail.booking_id);
}

module.exports.getUsersInBooking = function getUsersInBooking(booking_id){
    return db.prepare('SELECT ALL * FROM booking_details WHERE booking_id = ?')
        .all(booking_id);
}

module.exports.getAllLocationsInUniversity = function (universityId){
    return db.prepare('SELECT ALL * FROM locations WHERE university_id = ? ORDER BY name' )
        .all(universityId);
}

module.exports.addLocation = function (location){
    return db.prepare('INSERT INTO locations (name, university_id, description) VALUES (?, ?, ?)')
        .run(location.name, location.university_id, location.description);
}

module.exports.getRoomsInLocation = function (locationId){
    return db.prepare('SELECT ALL * FROM rooms WHERE location_id = ? ORDER BY name')
        .all(locationId);
}

module.exports.userExist = userExist;
module.exports.userEmailExist = userEmailExist;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.getUserEmail = getUserEmail;
module.exports.getUserEmailAndPasscode = getUserEmailAndPasscode;
module.exports.getAllUniversityNames = getAllUniversityNames;
module.exports.addNewUniversity = addNewUniversity;
module.exports.addBooking = addBooking;
module.exports.getBookingsByUniversity = getAmountOfBookingsByUniversity;
module.exports.getBookingByUniversity = getBookingByUniversity;
module.exports.getBookingsByUserID = getBookingsByUserID;
module.exports.getBookingByUserID = getBookingByUserID;
