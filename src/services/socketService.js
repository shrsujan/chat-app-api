import Repository from '../repositories'
import log from 'winston-logger-setup'

let members = []
let memberSocketObjects = []

export default function socketService (client, io) {
  // let id

  client.on('initialize', (username) => {
    username = username.toLowerCase()
    let success = (user) => {
      if (user) {
        if (members.indexOf(username) > -1) {
          client.emit('userInfo', false)
        } else {
          client.userInfo = user
          members.push(username)
          members.sort()
          memberSocketObjects.push(client)
          log.cnslLog.info(username + ' is online')
          client.emit('userInfo', user)
          io.emit('members', members)
          Repository.MessageRepository.retrieve({}, (data) => {
            client.emit('allMessages', data)
          }, (err) => {
            log.error(err)
          })
        }
      } else {
        let createSuccess = (user) => {
          if (user) {
            client.userInfo = user
            members.push(username)
            memberSocketObjects.push(client)
            log.cnslLog.info(username + ' is online')
            client.emit('userInfo', user)
            io.emit('members', members)
            Repository.MessageRepository.retrieve({}, (data) => {
              client.emit('allMessages', data)
            }, (err) => {
              log.error(err)
            })
          } else {
            log.error(username + ' not created')
          }
        }
        let createError = (err) => {
          log.error(err)
        }
        Repository.UserRepository.create({username: username}, createSuccess, createError)
      }
    }
    let error = (err) => {
      log.error(err)
    }
    Repository.UserRepository.retrieve({where: {username: username}}, success, error)
  })

  client.on('disconnect', () => {
    if (client.userInfo) {
      let uIndex = members.indexOf(client.userInfo.username)
      if (uIndex > -1) members.splice(uIndex, 1)
      log.cnslLog.info(client.userInfo + ' is offline')
    }
    let index = memberSocketObjects.indexOf(client)
    if (index > -1) memberSocketObjects.splice(index, 1)
    io.emit('members', members)
  })

  client.on('message', (messageObj) => {
    let success = (data) => {
      client.broadcast.emit('message', data)
    }
    let error = (err) => {
      log.error(err)
    }
    Repository.MessageRepository.create({message: messageObj.message, UserId: messageObj.userId}, success, error)
  })
}
