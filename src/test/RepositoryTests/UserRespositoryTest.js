import sinon from 'sinon'
import {expect} from 'chai'
import UserRepository from '../../repositories/UserRepository'
import model from '../../models'

describe('UserRepository', () => {
  describe('retrive function', () => {
    let retrieve = null
    let stub = null

    beforeEach(() => {
      retrieve = UserRepository.retrieve
    })

    it('should return an object containing a single user\'s information from users table if correct username is provided', (done) => {
      let options = {
        where: {
          username: 'valid'
        }
      }
      let expectedResult = {
        username: 'valid',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      stub = sinon.stub(model.User, 'findOne').returns(Promise.resolve(expectedResult))
      retrieve(options, (result) => {
        expect(result).to.be.an('object')
        expect(result).to.deep.equal(expectedResult)
        done()
      }, () => {
        done(new Error('AssertionError: expected success method to be invoked '))
      }).catch((e) => {
        done(e)
      })
    })

    it('should return false if the username provided in not in users table', (done) => {
      let options = {
        where: {
          username: 'invalid'
        }
      }
      stub = sinon.stub(model.User, 'findOne').returns(Promise.resolve(null))
      retrieve(options, (result) => {
        expect(result).to.be.false
        done()
      }, () => {
        done(new Error('AssertionError: expected success method to be invoked '))
      }).catch((e) => {
        done(e)
      })
    })

    it('should return invoke error function if the model runs into an error', (done) => {
      stub = sinon.stub(model.User, 'findOne').returns(Promise.reject(true))
      retrieve(null, () => {
        done(new Error('AssertionError: expected error method to be invoked '))
      }, (err) => {
        expect(err).to.be.true
        done()
      }).catch((e) => {
        done(e)
      })
    })

    afterEach(() => {
      stub.restore()
    })
  })

  describe('create function', () => {
    let create = null
    let stub = null

    beforeEach(() => {
      create = UserRepository.create
    })

    it('should create a new user with unique username and return the created user object', (done) => {
      let options = {
        username: 'unique'
      }
      let expectedResult = {
        $options: {
          isNewRecord: true
        },
        data: {
          username: 'unique',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      }
      stub = sinon.stub(model.User, 'create').returns(Promise.resolve(expectedResult))
      create(options, (result) => {
        expect(result).to.be.an('object')
        expect(result).to.deep.equal(expectedResult)
        done()
      }, () => {
        done(new Error('AssertionError: expected success method to be invoked '))
      }).catch((e) => {
        done(e)
      })
    })

    it('should return false if the query was successfully invoked but no new row was added', (done) => {
      let options = {
        where: {
          username: 'invalid'
        }
      }
      stub = sinon.stub(model.User, 'create').returns(Promise.resolve({
        $options: {
          isNewRecord: false
        }
      }))
      create(options, (result) => {
        expect(result).to.be.false
        done()
      }, () => {
        done(new Error('AssertionError: expected success method to be invoked '))
      }).catch((e) => {
        done(e)
      })
    })

    it('should return invoke error function if the model runs into an error', (done) => {
      stub = sinon.stub(model.User, 'create').returns(Promise.reject(true))
      create(null, () => {
        done(new Error('AssertionError: expected error method to be invoked '))
      }, (err) => {
        expect(err).to.be.true
        done()
      }).catch((e) => {
        done(e)
      })
    })

    afterEach(() => {
      stub.restore()
    })
  })
})
