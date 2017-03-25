import fs from 'fs'
import path from 'path'
const basename = path.basename(module.filename)

let repository = {}

fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach((file) => {
      let repoName = file.split('.')[0]
      let repo = require('./' + repoName)
      repository[repoName] = repo
    })

export default repository
