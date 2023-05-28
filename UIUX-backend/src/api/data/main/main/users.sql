create table users
(
    user_id       INTEGER
        primary key,
    name          TEXT    not null,
    email         TEXT    not null,
    password      TEXT    not null,
    role          INTEGER not null,
    university_id INTEGER not null
        references universities
);

