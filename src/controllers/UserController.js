import Repository from '../repositories'
import CollectClass from '../foundations/CollectClass'

exports.collect = (req, res, next) => {
  let collectInstance = new CollectClass()
  collectInstance.setParams([
    'username'
  ])
  collectInstance.setMandatoryFields({
    username: 'Username is not provided'
  })
  collectInstance.collect(req).then((data) => {
    req.userData = data
    next()
  }).catch((err) => {
    next(err)
  })
}

exports.getUserByUserUsername = (req, res, next) => {
  let options = {
    where: {
      username: req.userData.username
    }
  }
  let success = (data) => {
    if (data) {
      req.cdata = {
        success: 1,
        message: 'User retrieved successful',
        data
      }
      next()
    } else {
      req.cdata = {
        success: 0,
        message: 'User not found'
      }
      next()
    }
  }
  let error = (error) => {
    error = new Error(error)
    next(error)
  }
  Repository.UserRepository.retrieve(options, success, error)
}
