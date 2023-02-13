import express, { query, request, response, Router } from 'express'
import cookieParser from 'cookie-parser'
import { createTokens, validateToken, isAdmin } from './jwt.js'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import bcrypt, { hash } from 'bcrypt'
import {
  pool,
  getVacations,
  createNewVacation,
  updateVacation,
  deleteVacation,
  storeNewUser,
  findUser,
  isUserEx,
  checkRole,
  setTheFavToDb,
  getTheFavToDb,
} from './database.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.post('/register', isUserEx, (req, res) => {
  const { firstName, lastName, userName, password } = req.body.data
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      storeNewUser(firstName, lastName, userName, hash)
      return res.status(200).send('registration comlplited')
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })
})

app.post('/login', async (req, res) => {
  const { userName, password } = req.body.data
  const user = await findUser(userName)
  if (!user) {
    return res.status(400).send('Wrong User Name Or Pasword...')
  }
  const role = await checkRole(userName)
  const dbPasword = user
  bcrypt.compare(password, dbPasword).then((mach) => {
    if (!mach) {
      return res.status(400).send('wrong password')
    } else {
      const accessToken = createTokens(userName)
      req.locals = { accessToken: accessToken, admin: role, userName: userName }
      return res.status(200).send(req.locals)
    }
  })
})

app.get('/profile', validateToken, async (req, res) => {
  return res.status(200).send(req.locals)
})

app.get('/vacations', async (req, res) => {
  const vacations = await getVacations()
  try {
    res.send(vacations)
  } catch (error) {
    res.status(500)
  }
})

app.patch('/fav/:id', validateToken, async (req, res) => {
  const dbFavorites = await setTheFavToDb(req.params.id, req.locals.userName)
  return res.status(200).send(dbFavorites)
})

app.get('/fav/', validateToken, async (req, res) => {
  const dbFavorites = await getTheFavToDb(
    req.locals.userName,
    req.body['statusTrue']
  )
  return res.status(200).send(dbFavorites)
})

app.post('/new', validateToken, isAdmin, async (req, res) => {
  const {
    title,
    category,
    description,
    destination,
    img_url,
    date_start,
    date_end,
    price,
  } = req.body.data
  const newVacation = await createNewVacation(
    title,
    category,
    description,
    destination,
    img_url,
    date_start,
    date_end,
    price
  )
  try {
    res.send('Vacation added successfully')
  } catch (error) {
    res.status(500)
  }
})

app.patch('/update/:id', validateToken, isAdmin, async (req, res) => {
  const id = req.params.id
  const {
    title,
    category,
    description,
    destination,
    img_url,
    date_start,
    date_end,
    price,
  } = req.body.data
  await updateVacation(
    id,
    title,
    category,
    description,
    destination,
    img_url,
    date_start,
    date_end,
    price
  )
  try {
    res.send('Vacation Updated Successfully')
  } catch (error) {
    res.status(500)
  }
})

app.delete('/delete/:id', validateToken, isAdmin, async (req, res) => {
  const id = req.params.id
  await deleteVacation(id)
  try {
    res.send('Vacation deleted Successfully')
  } catch (error) {
    res.status(500)
  }
})

app.listen(process.env.APP_PORT, () =>
  console.log(`server is listening on port ${process.env.APP_PORT}`)
)
