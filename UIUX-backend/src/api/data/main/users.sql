create table users
(
    user_id    INTEGER
        primary key,
    first_name TEXT         not null,
    email      TEXT         not null,
    passcode   TEXT     not null,
    role       INTEGER      not null
);
