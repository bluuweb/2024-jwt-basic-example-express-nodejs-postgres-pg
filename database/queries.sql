DROP TABLE IF EXISTS RESERVATIONS;
DROP TABLE IF EXISTS PETS;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS ROLES;

CREATE TABLE ROLES (
    RID SERIAL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL UNIQUE CHECK (NAME IN ('ADMIN', 'VET', 'CLIENT'))
);

CREATE TABLE USERS (
	UID SERIAL PRIMARY KEY,
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	PASSWORD VARCHAR(60) NOT NULL,
	USERNAME VARCHAR(50) NOT NULL,
    ROLE_ID INT NOT NULL DEFAULT 3,
    FOREIGN KEY (ROLE_ID) REFERENCES ROLES(RID)
);

CREATE TABLE PETS (
    PID SERIAL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    SPECIES VARCHAR(50) NOT NULL,
    BREED VARCHAR(50),
    OWNER INT NOT NULL,
    FOREIGN KEY (OWNER) REFERENCES USERS(UID)
);

CREATE TABLE RESERVATIONS (
    RID SERIAL PRIMARY KEY,
    PET INT NOT NULL,
    VET INT NOT NULL,
    RESERVATION_DATE DATE NOT NULL,
    DESCRIPTION TEXT,
    FOREIGN KEY (PET) REFERENCES PETS(PID),
    FOREIGN KEY (VET) REFERENCES USERS(UID)
);

INSERT INTO ROLES (NAME) VALUES ('ADMIN');
INSERT INTO ROLES (NAME) VALUES ('VET');
INSERT INTO ROLES (NAME) VALUES ('CLIENT');

SELECT * FROM USERS;

-- CREAR VÍA API:
-- admin@admin.com, vet_1@vet.com, client_1@client.com

-- ACTUALIZAR ROLE ADMIN
UPDATE USERS
SET ROLE_ID = 1
WHERE EMAIL = 'admin@admin.com';

-- VIDEO 3 PAGINACIÓN
SELECT * FROM USERS;
SELECT * FROM PETS;

-- verificar que tengas un usuario client y según su uid crear pets
-- CREAR PETS 21 PETS CON OWNER 3 (siempre y cuando exista el owner 3)
INSERT INTO pets (NAME, SPECIES, BREED, OWNER) VALUES
('Firulais', 'Perro', 'Labrador', 3),
('Mishi', 'Gato', 'Siames', 3),
('Milo', 'Perro', 'Chihuahua', 3),
('Molly', 'Perro', 'Pug', 3),
('Max', 'Perro', 'Pastor Aleman', 3),
('Luna', 'Perro', 'Labrador', 3),
('Bella', 'Perro', 'Labrador', 3),
('Daisy', 'Perro', 'Labrador', 3),
('Lucy', 'Perro', 'Labrador', 3),
('Cooper', 'Perro', 'Labrador', 3),
('Charlie', 'Perro', 'Labrador', 3),
('Rocky', 'Perro', 'Labrador', 3),
('Buddy', 'Perro', 'Labrador', 3),
('Lola', 'Perro', 'Labrador', 3),
('Sadie', 'Perro', 'Labrador', 3),
('Duke', 'Perro', 'Labrador', 3),
('Zoe', 'Perro', 'Labrador', 3),
('Stella', 'Perro', 'Labrador', 3),
('Penny', 'Perro', 'Labrador', 3),
('Ruby', 'Perro', 'Labrador', 3),
('Rosie', 'Perro', 'Labrador', 3);