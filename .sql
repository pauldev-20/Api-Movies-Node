DROP DATABASE IF EXISTS api_movies_data;
CREATE DATABASE api_movies_data;
-- usar
USE api_movies_data;

-- crear tabla movies
CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID()),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) UNSIGNED NOT NULL
);
    
-- crear tabla genero
CREATE TABLE genre (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(255) NOT NULL
);
    
-- crear relación
CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
);
    
-- insertar datos
INSERT INTO genre(name) VALUES 
    ('Drama'),
    ('Action'),
    ('Crime'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Romance');
    
INSERT INTO movie(id, title, year, director, duration, poster,rate) VALUES
    (UUID_TO_BIN(UUID()),'The Dark Night',2008,'Christopher Nolan',152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
    (UUID_TO_BIN(UUID()),'Inception',2010,'Christopher Nolan',148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 3.8),
    (UUID_TO_BIN(UUID()),'The Pulp Fiction',1994,'Quentin Tarantino',154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 4.9);
    
INSERT INTO movie_genres(movie_id, genre_id)
    VALUES
    ((SELECT id FROM movie WHERE title = 'Inception'), 1),
    ((SELECT id FROM movie WHERE title = 'Inception'), 4),
    ((SELECT id FROM movie WHERE title = 'The Dark Night'), 2),
    ((SELECT id FROM movie WHERE title = 'The Pulp Fiction'), 5);