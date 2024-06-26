# Api de Peliculas con Node

Este proyecto es una aplicación hecha en NodeJs que construye una Api para interactuar con una lista de películas. 

## Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Despliegue Local](#despliegue-local)
- [Despliegue Mysql](#despliegue-mysql)

## Requisitos

Para ejecutar este proyecto, necesitas tener instalado:

- Node.js (versión 14 o superior)
- npm (versión 6 o superior) o yarn (opcional)

## Instalación

1. Clona el repositorio en tu máquina local:

    ```bash
    git clone https://github.com/pauldev24/Api-Movies-Node.git
    cd Api-Movies-Node
    ```

2. Instala las dependencias del proyecto:

    Con npm:
    ```bash
    npm install
    ```

    Con yarn:
    ```bash
    yarn install
    ```

## Despliegue Local

Para ejecutar el proyecto en tu entorno local, utiliza el siguiente comando:

Con npm:
```bash
npm run start-2
```

## Despliegue Mysql

Para ejecutar el proyecto en tu entorno local, pero utilizando una base de datos mysql, sigua las siguientes instrucciones:

- Vaya al archivo .sql y ejecute es script sql que esta ahi
- Luego en la ruta ./models/mysql/movie.js configure el siguiente archivo: 
```bash
const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'api_movies_data'
}
```
- Luego ejecute 
con npm:
```bash
npm run start
```