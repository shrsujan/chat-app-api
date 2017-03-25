import model from '../models'

exports.create = (options, success, error) => {
  return model.User.create(options).then((result) => {
    if (result.$options.isNewRecord) {
      success(result)
    } else {
      success(false)
    }
  }, error)
}

exports.retrieve = (options, success, error) => {
  return model.User.findOne(options).then((result) => {
    if (result) {
      success(result)
    } else {
      success(false)
    }
  }, error)
}
