import express from 'express'
import config from '../config/config'
import UserC from '../controllers/UserController'
import mw from '../middlewares/response'

let router = express.Router()

router.get('/user/:username', UserC.collect, UserC.getUserByUsername, UserC.addNewUser, mw.respond, mw.error)

router.all('/*', (req, res, next) => {
  res.status(404).render('404', {
    header: {
      title: config.app.title
    }
  })
})

export default router
