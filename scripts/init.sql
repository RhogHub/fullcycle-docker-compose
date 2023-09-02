use nodedb;

CREATE TABLE IF NOT EXISTS people (
    id_people int not null auto_increment, name varchar(50), 
    primary key(id_people)
);