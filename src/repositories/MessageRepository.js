import model from '../models'

exports.create = (options, success, error) => {
  return model.Message.create(options).then((result) => {
    if (result.$options.isNewRecord) {
      model.Message.findOne({
        where: {
          id: result.id
        },
        include: [{
          model: model.User
        }]
      })
      .then((r) => success(r), (e) => error(e))
    } else {
      success(false)
    }
  }, error)
}

exports.retrieve = (options, success, error) => {
  options.include = [{
    model: model.User
  }]
  options.order = 'createdAt ASC'
  return model.Message.findAll(options).then((result) => {
    if (result && result.length > 0) {
      success(result)
    } else {
      success(false)
    }
  }, error)
}
