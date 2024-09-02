module.exports = {
  getIndex: (req, res) => {
    console.log('get index')
    res.render('index.ejs')
  }
}
