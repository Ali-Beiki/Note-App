# Note App

## description
_A site containing user and administrator roles that keeps user notes_

## prerequisite
- Node JS
- Postgres

## Config
### create a database
_You must create a database in postgres_

### Add Admin 
__Note : Before starting, you need to create a user in table users with administrator role in Postgres DB__

### Edit config file
_Setting the config file in app/config/default.json_

- Postgres DB
```sh
"db": {
        "name": "DB name",// name db
        "username": "postgres",// username in postgres
        "password": "admin",// username in password
        "host": "localhost"// server DB
    }
```

- Googel Recaptcha
```sh
"reCaptchaGoogel": {
        "SITE_KEY": "YOUR_SITE_KEY",
        "SECRET_KEY": "YOUR_SECRET_KEY"
    },
```

## Start

__Instal Package__
```sh
 npm i
```

__Run__
```sh
 npm start
```




