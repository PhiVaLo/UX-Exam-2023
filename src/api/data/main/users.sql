create table users
(
    user_id    INTEGER
        primary key,
    first_name TEXT    not null,
    last_name  TEXT    not null,
    role       INTEGER not null
);

