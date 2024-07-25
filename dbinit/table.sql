CREATE TABLE IF NOT EXISTS `users` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    contactNumber VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(250),
    status VARCHAR(20),
    role VARCHAR(20),
    profilePicUrl VARCHAR(2083)
);

INSERT INTO
    `users` (
        name,
        contactNumber,
        email,
        password,
        status,
        role,
        profilePicUrl
    )
VALUES
    (
        'João Silva',
        '123456789',
        'joao.silva2@example.com',
        'senhaSegura',
        'true',
        'user',
        'http://example.com/perfil/joao.jpg'
    );

CREATE TABLE IF NOT EXISTS `category` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `articles`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    category_id Integer NOT NULL,
    publication_date DATE NOT NULL,
    status VARCHAR(20)
);