const { Card, Deck } = require('../models/card')

module.exports = {
  getDashboard: async (req,res) => {
    console.log(req.user)
    try{
      // get all of the cards the user has
      const cards = await Card.find({ user: req.user.id }).lean()
      // get all of the decks the user has
      const decks = await Deck.find({ user: req.user.id }).lean()
      // send all information over to the view
      res.render('cards.ejs', { cards: cards, decks: decks, user: req.user })
    }catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  getDeck: async (req,res) => {
    console.log(req.user)
    try{
      // get all of the cards in the deck
      const cards = await Card.find({ deck: req.params.id }).lean()
      // get all of the decks the user has
      const decks = await Deck.find({ user: req.user.id }).lean()
      // send all information over to the view
      res.render('cards.ejs', { cards: cards, decks: decks, user: req.user })
    }catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  getAddCard: (req,res) => {
    res.render('addCard.ejs')// before -> res.render('add.ejs')
  },
  processAddCard: async (req,res) => {
    try{
      // obtaining a list of all deck names the user has
      const decks = await Deck.distinct('title', { userId: req.user.id })

      // setting the value of the title to what's in the DB or what the user entered
      const deckTitle = decks.filter(deck => !deckTitle.localeCompare(deck, 'en', { sensitivity: base }))[0] || req.body.deckTitle.replace(/\s\s+/g, ' ').trim()

      // finding the specific deck
      let deck = await Deck.findOne({ title: deckTitle })
      
      // if no deck, create a new deck
      if(!deck){
        deck = await Deck.create({
          title: deckTitle,
          userId: req.user.id,
        })
        console.log('A new deck was created!')
      }

      const card = await Card.create({ 
        question: req.body.question, 
        answer: req.body.answer,
        active: true,
        userId: req.user.id,
        deck: deck._id,
      })
      
      // update the deck with the card created
      await Deck.findByIdAndUpdate(deck._id, {
        $push: {
          "cards": card._id
        }
      }, () => console.log('Card added to deck!'))

      console.log('A new card has been created!!')
      res.redirect('/cards')
    } catch(err){
      console.error(err)
      //res.render('error/500')
    }
  },
  getUpdateCard: async (req,res) => {
    try{
      const card = await Card.findById(req.params.id).lean()
      // ensure card is in collection (should be a redundency)
      if(!card){
        res.render('error/404')
      }

      // ensure that the userId matches userId on card (additional redundency)
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else{
        res.render('cards/edit', { card: card })
      }
      
    } catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  processUpdateCard: async (req,res) => {
    try{
      const card = await Card.findById(req.params.id).lean()

      // ensure card is in collection (should be a redundency)
      if(!card){
        res.render('error/404')
      }

      // ensure that the userId matches userId on card (additional redundency)
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else {
        await Card.findOneAndUpdate({ _id: req.params.id }, {
          question: req.body.question, 
          answer: req.body.answer, 
          deck: req.body.deck
        },{
          // ensures updates match model schema
          runValidators: true
        })
        console.log('Your card has been updated!')
        res.redirect('/cards')
      }
    } catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  deleteCard: async (req,res) => {
    try{
      await Card.remove({ _id: req.body.cardToDelete})
      console.log('Card has been deleted!')
      res.json('Card has been deleted!')
    } catch(err){
      console.error(err)
    }
  }
} 