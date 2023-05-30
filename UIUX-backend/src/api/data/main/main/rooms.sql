create table main.rooms
(
    room_id       INTEGER
        primary key,
    name          TEXT    not null,
    location_id   INTEGER not null
        references main.locations,
    university_id INTEGER not null
        references main.universities,
    restriction   TEXT
);

