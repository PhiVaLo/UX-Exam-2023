create table bookings
(
    booking_id    INTEGER
        primary key,
    owner_id      INTEGER not null
        references users,
    university_id INTEGER not null
        references universities,
    description   TEXT,
    date_time     TEXT
);

