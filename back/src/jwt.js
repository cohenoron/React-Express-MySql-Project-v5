import pkg from 'jsonwebtoken'
import { checkRole } from './database.js'
const { sign, verify } = pkg
import dotenv from 'dotenv'
dotenv.config()

const createTokens = (user) => {
  const accessToken = sign(user, process.env.ACCESS_TOKEN)
  return accessToken
}

const validateToken = async (req, res, next) => {
  const authorizationHeader =
    req.headers['authorization'] || req.body.headers['authorization']
  if (!authorizationHeader) {
    return res.status(403).send({ error: 'user not authenticated' })
  }
  const jwt = authorizationHeader.split(' ')[1]
  try {
    const validToken = verify(jwt, process.env.ACCESS_TOKEN)
    if (validToken) {
      const role = await checkRole(validToken)
      req.locals = { admin: role, userName: validToken }
      return next()
    }
  } catch (err) {
    return res.status(401).send({ error: err })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const admin = req.locals.admin
    if (admin) {
      return next()
    } else {
      return res.status(401).send('User Not Authorized')
    }
  } catch (err) {
    return res.status(401).send('User Not Authorized')
  }
}

export { createTokens, validateToken, isAdmin }
