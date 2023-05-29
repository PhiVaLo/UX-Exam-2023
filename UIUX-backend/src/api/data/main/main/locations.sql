create table locations
(
    location_id   INTEGER
        primary key,
    name          TEXT    not null,
    university_id INTEGER not null
        references universities,
    description   TEXT
);

