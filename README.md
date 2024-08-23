# Todo List App
Create your own todo list powered by Passport.js, EJS, Node, MongoDB, and Express.

![todolist](https://github.com/user-attachments/assets/5b89df51-c4dc-4676-b4d9-6e832e1fcfdb)

# Features

- Custom user profiles and authentication powered by Passport.js
- Add, delete, and mark todo list items as complete

#Installation

`npm install` 
  - Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI`
 
## Lessons Learned

The goal of rebuilding this project was to become more familiar with the structure of full-stack apps, particularly MVC architecture. Most of the code that connected the backend to MongoDB needed to be rewritten to work in 2024.

The biggest challenge was rewriting the authentication code that allowed Passport to create and maintain sessions. The order that middleware is introduced in the main Node server file is critical to authentication working properly.

## Future enhancements

  - The signup form would benefit from email and password validation. 
  - Todo list items should be editable. 
  - The frontend would benefit from having a more responsive framework like React.

## How It's Made

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator
