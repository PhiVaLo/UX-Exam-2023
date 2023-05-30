create table main.bookings
(
    booking_id    INTEGER
        primary key,
    owner_id      INTEGER not null
        references main.users,
    room_id       INTEGER not null
        references main.rooms,
    university_id INTEGER not null
        references main.universities,
    description   TEXT,
    date_time     TEXT,
    duration      INTEGER
);

