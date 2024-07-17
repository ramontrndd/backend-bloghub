CREATE TABLE IF NOT EXISTS `users` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    contactNumber VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(250),
    isDeletable VARCHAR (20),
    status VARCHAR(20),
    role VARCHAR(20),
    profilePicUrl VARCHAR(2083)
);

INSERT INTO `users` (name, contactNumber, email, password, isDeletable, status, role, profilePicUrl) 
VALUES ('João Silva', '123456789', 'joao.silva2@example.com', 'senhaSegura', 'true', 'true', 'user', 'http://example.com/perfil/joao.jpg');