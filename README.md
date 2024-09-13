# PizzaFlix

This is a website where user can Browse the most up-to-date movie/tv show information.
Take a look! -> [PizzaFlix](https://pizza-flix.vercel.app/)

- [Features](#features)
- [How to start app locally](#how-to-start-app-locally)
- [Technologies](#technologies)
- [Structure](#structure)

## Features

### Account System

- Login/Logout
- Password Update
- Account Password Encryption

### Review Management

- User can browse review from others
- User can write/delete review for movies

### Favorite Management

- User can add/delete movie to favorites
- User can look up its favorite movies

### Search System

- User can search movie/cast/tv show

### User Interface

- Dark/Light mode switch
- Responsive Web Design
- Interactive slider

## How to start app locally

1. clone/fork this repo
2. download [mongoDB](https://www.mongodb.com/docs/manual/installation/)
3. create a database -> `use myDB-name`
4. register [The Movie Database](https://www.themoviedb.org/signup) account
5. generate [API key](https://www.themoviedb.org/settings/api)
6. create `.env` in `/server`

/server/.env

```py
MONGODB_URL = mongodb://127.0.0.1:27017/<your-db-name> # replace it with your db name
PORT = 5000
TOKEN_SECRET = <your_secret_key> # random string
TMDB_BASE_URL = https://api.themoviedb.org/3/
TMDB_API_KEY = <your-tmdb-api-key> # replace it with your API key
```

7. `cd /server` `npm install` `npm start`
8. create a new terminal `cd /client` `npm install` `npm start`

## Technologies

### Front end

- Create react app
- Material UI
- React router
- Redux Toolkit
- SwiperJS
- Formik
- Yup
- Axios

### Back end

- Express rest api
- Express Validator
- Jsonwebtoken
- Mongoose
- Axios

## Structure

### Front end

```mermaid
graph BT
    server --> |send data|component
    redux[(redux store)] --> |change state |component(component)
    view -->|show| user(user)
    component --> |call api| server[server]
    component --> |dispatch action|redux
    component(components) --> |render|view(view)
    user[user] -->|operate|view
    view(view) --> |trigger|component(components)
```

### Backend

```mermaid
graph TD
    A[Client] -->|request| C(routes)
    C --> |Requests requiring verification| D(token middleware)
    C --> |normal request| E(controller)
    D --> |success|E
    D --> |failed|H
    E --> |movie/people request|F[(TMDB Database)]
    F --> |res|E
    E --> |user/review/favorite request|G[(mongoDB)]
    G --> |res|E
    E --> |success/failed|H
    H(handler) --> |response|A
```

## Lighthouse report

![alt text](/img/overall.png)
![alt text](/img/webvitals.png)

### web-vitals report


![alt text](image.png)