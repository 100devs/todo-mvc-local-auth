const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const bcrypt = require('bcrypt')

//  exports.getLogin = (req, res) => {
//     if (req.user) {
//       return res.redirect('/todos')
//     }
//     res.render('login', {
//       title: 'Login'
//     })
//   }
  
  exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
  
      if (!user) {
        return res.status(401).json({ message: info.message })
      }
  
      req.logIn(user, err => {
        if (err) {
          return next(err)  
        }
  
        res.redirect('/todos')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  // exports.getSignup = (req, res) => {
  //   if (req.user) {
  //     return res.redirect('/todos')
  //   }
  //   res.render('signup', {
  //     title: 'Create Account'
  //   })
  // }
  
  exports.postSignup = async(req, res) => {
    const { userName, email, password } = req.body
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email })
  
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }
  
      // Create new user
      user = new User({ userName, email, password })
  
      // Hash the password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
  
      // Save user to DB
      await user.save();
  
      //res.json({ message: 'Registration successful' });
  
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/todos')
      })
      //res.redirect('/home')
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }