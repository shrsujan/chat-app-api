import express from 'express'
import config from '../config/config'
// import mw from '../middlewares/response'

let router = express.Router()

router.all('/*', (req, res, next) => {
  res.status(404).render('404', {
    header: {
      title: config.app.title
    }
  })
})

export default router
