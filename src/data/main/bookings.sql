create table bookings
(
    booking_id          INTEGER
        primary key,
    room_id             INTEGER
        references rooms,
    owner_id            INTEGER
        references users,
    booking_description TEXT
);

