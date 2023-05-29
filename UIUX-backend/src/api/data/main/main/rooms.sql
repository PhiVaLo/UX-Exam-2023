create table rooms
(
    room_id       INTEGER
        primary key,
    name          TEXT    not null,
    location_id   INTEGER not null
        references locations,
    university_id INTEGER not null
        references universities,
    restriction   TEXT
);

