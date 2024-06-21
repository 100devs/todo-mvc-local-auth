![billTracker](https://user-images.githubusercontent.com/52755177/188661307-18bf373e-d925-40a2-abc3-e8938fe9051d.gif)
# Introduction
Bill Tracking App

A simple app to track your bills due dates, paid and unpaid bill indicator, your own personal bill tracker like your google calender.
It is built with NodeJs using the MVC Architecture, we have also implemented "authorization" using Passport so folx can sign up, customize & personalize the app 

---
# Tech Stack Used

Nodejs, ejs, express, express-flash, express-session, mongodb, mongoose, passport, passport-local, validator

Nodejs and Express for a simpler app server,  Mongodb database, Ejs template enging for the front-end. 


---


# Why was this stack chosen?

Node is a pretty lightweight server choice and can be spun up fairly easily. We needed a backend that could send a different response based on the result of another controller and the ability to dynamically render file. By using Express' built in middleware architecture we could cleanly write fallbacks. Mongodb  we needed a very simple yet powerful database to handle all of our user data. Ejs template engine a very simple and yet powerful template for the front -end (view).



# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---
 
 Have fun testing and improving it! 😎


