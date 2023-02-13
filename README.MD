# Unsplash backend api

## Routes

- /api/photos
- /api/users
- /api/favorites

## Features

- photos - unsplash api:
  - get('/:id') -> get photo details by id
  - get('/user/:username') -> get photos by user
  - get('/') -> get array of photo urls
- users - JWT Auth:

  - post('/register') -> provide username email and password
  - post('/login') -> provide email and password, get JWT
  - get('/me') -> provide JWT as Auth Bearer Token and get username, email, id in DB

- favorites - DB, only with JWT provided as Auth Bearer Token:
  - get('/') -> get all photos saved by user
  - post('/add') -> add a photo to user's favs
  - delete('/:id') -> delete a photo from user's favs
  - put('/:id') -> change a photo's description in user's favs
