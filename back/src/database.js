import { createPool } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = createPool({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
}).promise()

const isUserEx = async (req, res, next) => {
  const { userName } = req.body.data
  const [exist] = await pool.query(
    `SELECT * FROM vacations.users WHERE username = ?`,
    [userName]
  )
  if (exist[0]) {
    return res.status(400).send('user name already exists, try again...')
  }
  if (!exist[0]) {
    return next()
  }
}

const storeNewUser = async (firstName, lastName, userName, hash) => {
  return await pool.query(
    `insert into users (firstName, lastName, userName, password)
  values (?,?,?,?)`,
    [firstName, lastName, userName, hash]
  )
}

const findUser = async (user) => {
  const [isMached] = await pool.query(
    `SELECT * FROM vacations.users WHERE username = ?`,
    [user]
  )

  if (isMached[0]) {
    return isMached[0].password
  }
}

const checkRole = async (userName) => {
  const [isAdmin] = await pool.query(
    `SELECT admin FROM vacations.users WHERE username = ?`,
    [userName]
  )
  const [roles] = isAdmin
  return roles.admin
}

const getVacations = async () => {
  const [vacations] = await pool.query('SELECT * FROM vacation_list')
  return vacations
}

const createNewVacation = async (
  title,
  category,
  description,
  destination,
  img_url,
  date_start,
  date_end,
  price
) => {
  const addVacation = await pool.query(
    `insert into vacation_list (
    title,
    category,
    description,
    destination,
    img_url,
    date_start,
    date_end,
    price 
    )
    
    values (?,?,?,?,?,?,?,?)`,
    [
      title,
      category,
      description,
      destination,
      img_url,
      date_start,
      date_end,
      price,
    ]
  )

  return addVacation
}

const setTheFavToDb = async (id, userName) => {
  const [userTrueIdFromDB] = await pool.query(
    `select * from vacations.favorite_vacations WHERE username = ? and vacation_id = ?`,
    [userName, id]
  )

  if (!userTrueIdFromDB[0]) {
    await pool.query(
      `INSERT INTO vacations.favorite_vacations (userName, vacation_id) VALUES (?, ?)`,
      [userName, id]
    )
  }

  if (userTrueIdFromDB[0]) {
    await pool.query(
      `delete from vacations.favorite_vacations WHERE username = ? and vacation_id = ?`,
      [userName, id]
    )
  }

  const [result] = await pool.query(
    `select * from vacations.favorite_vacations WHERE username = ?`,
    [userName]
  )
  return result
}

const getTheFavToDb = async (userName, statusTrue) => {
  const [result] = await pool.query(
    `select * from vacations.favorite_vacations WHERE username = ?`,
    [userName]
  )
  return result
}

const updateVacation = async (
  id,
  title,
  category,
  description,
  destination,
  img_url,
  date_start,
  date_end,
  price
) => {
  return await pool.query(
    `update vacation_list
    set 
    title = ?,
    category = ?,
    description = ?,
    destination = ?,
    img_url = ?,
    date_start = ?,
    date_end = ?,
    price = ? 
    
     where id = ${id}`,
    [
      title,
      category,
      description,
      destination,
      img_url,
      date_start,
      date_end,
      price,
    ]
  )
}

const deleteVacation = async (id) => {
  return await pool.query(
    `delete from vacation_list
     where id = ${id}`
  )
}

export {
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
  pool,
}
