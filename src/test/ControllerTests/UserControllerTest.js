import sinon from 'sinon'
import {expect} from 'chai'
import UserController from '../../controllers/UserController'
import Repository from '../../repositories'

describe('UserController', () => {
  describe('collect function', () => {
    let collect = null

    beforeEach(() => {
      collect = UserController.collect
    })

    it('should parse and collect username field provided in the url', (done) => {
      let req = {
        method: 'get',
        params: {
          username: 'test'
        }
      }
      collect(req, null, (e = null) => {
        if (e) {
          done(new Error('AssertionError: expected promise to be resolved'))
        } else {
          expect(req.userData).to.be.an('object')
          expect(req.userData).to.deep.equal(req.params)
          done()
        }
      })
    })

    it('should return an error particular error messages if mandatory fields are not provided', (done) => {
      let req = {
        method: 'get',
        params: {}
      }
      collect(req, null, (e = null) => {
        if (e) {
          try {
            expect(e).to.be.an('array')
            expect(e).to.deep.equal(['Username is not provided'])
            done()
          } catch (e) {
            done(e)
          }
        } else {
          done(new Error('AssertionError: expected promise to be rejected'))
        }
      })
    })
  })

  describe('getUserByUsername function', () => {
    let getUserByUsername = null
    let stub = null

    beforeEach(() => {
      getUserByUsername = UserController.getUserByUsername
    })

    it('should retrieve a single user if the username provided is in the users table', (done) => {
      let req = {
        userData: {
          username: 'test'
        }
      }
      let expectedResult = {
        success: 1,
        message: 'User retrieved successful',
        data: {
          username: 'test',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      }
      stub = sinon.stub(Repository.UserRepository, 'retrieve').callsFake((options, success, error) => {
        success(expectedResult.data)
      })
      getUserByUsername(req, null, (e = null) => {
        if (e) {
          done(new Error('AssertionError: expected success method to be invoked '))
        } else {
          expect(req.cdata).to.be.an('object')
          expect(req.cdata).to.deep.equal(expectedResult)
          done()
        }
      })
    })

    it('should return no user found message if the username provided is not in the users table and success is invoked with false as parameter', (done) => {
      let req = {
        userData: {
          username: 'test'
        }
      }
      let expectedResult = {
        success: 0,
        message: 'User not found'
      }
      stub = sinon.stub(Repository.UserRepository, 'retrieve').callsFake((options, success, error) => {
        success(false)
      })
      getUserByUsername(req, null, (e = null) => {
        if (e) {
          done(new Error('AssertionError: expected success method to be invoked '))
        } else {
          expect(req.cdata).to.be.an('object')
          expect(req.cdata).to.deep.equal(expectedResult)
          done()
        }
      })
    })

    it('should invoke error function if the repository function runs into an error', (done) => {
      let req = {
        userData: {
          username: 'test'
        }
      }
      let errorMessage = 'Repository error'
      stub = sinon.stub(Repository.UserRepository, 'retrieve').callsFake((options, success, error) => {
        error(errorMessage)
      })
      getUserByUsername(req, null, (e = null) => {
        if (e) {
          expect(e).to.be.an('error')
          expect(e.message).to.equal(errorMessage)
          done()
        } else {
          done(new Error('AssertionError: expected success method to be invoked '))
        }
      })
    })

    afterEach(() => {
      stub.restore()
    })
  })

  describe('addNewUser function', () => {
    let addNewUser = null
    let stub = null

    beforeEach(() => {
      addNewUser = UserController.addNewUser
    })

    it('should proceed to call next if previous function\'s response is successful', (done) => {
      let req = {
        cdata: {
          success: 1
        }
      }
      addNewUser(req, null, done)
    })

    it('should create a new user from the provided username field if previous function\'s response is unsuccessful', (done) => {
      let req = {
        userData: {
          username: 'test'
        },
        cdata: {
          success: 0
        }
      }
      let expectedResult = {
        success: 1,
        message: 'User added successfully',
        data: {
          username: 'test',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      }
      stub = sinon.stub(Repository.UserRepository, 'create').callsFake((options, success, error) => {
        success(expectedResult.data)
      })
      addNewUser(req, null, (e = null) => {
        if (e) {
          done(new Error('AssertionError: expected success method to be invoked '))
        } else {
          expect(req.cdata).to.be.an('object')
          expect(req.cdata).to.deep.equal(expectedResult)
          done()
        }
      })
    })

    it('should return no user not added message if the user could not be inserted into the users table and success is invoked with false as parameter', (done) => {
      let req = {
        userData: {
          username: 'test'
        },
        cdata: {
          success: 0
        }
      }
      let expectedResult = {
        success: 0,
        message: 'User not added'
      }
      stub = sinon.stub(Repository.UserRepository, 'create').callsFake((options, success, error) => {
        success(false)
      })
      addNewUser(req, null, (e = null) => {
        if (e) {
          done(new Error('AssertionError: expected success method to be invoked '))
        } else {
          expect(req.cdata).to.be.an('object')
          expect(req.cdata).to.deep.equal(expectedResult)
          done()
        }
      })
    })

    it('should invoke error function if the repository function runs into an error', (done) => {
      let req = {
        userData: {
          username: 'test'
        },
        cdata: {
          success: 0
        }
      }
      let errorMessage = 'Repository error'
      stub = sinon.stub(Repository.UserRepository, 'create').callsFake((options, success, error) => {
        error(errorMessage)
      })
      addNewUser(req, null, (e = null) => {
        if (e) {
          expect(e).to.be.an('error')
          expect(e.message).to.equal(errorMessage)
          done()
        } else {
          done(new Error('AssertionError: expected success method to be invoked '))
        }
      })
    })

    afterEach(() => {
      if (stub !== null) stub.restore()
    })
  })
})
