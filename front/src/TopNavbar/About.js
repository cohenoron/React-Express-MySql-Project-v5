import React, { useContext } from 'react'
import { context } from '../App'
import { FaWindowClose } from 'react-icons/fa'
import table from '../TopNavbar/lib-about/table.png'

export const About = () => {
  const { setOpenAboutModal } = useContext(context)

  return (
    <>
      <div id="divAbout">
        <div id="about-section">
          <FaWindowClose
            id="about-close-btn"
            onClick={() => setOpenAboutModal(false)}
          />
          <h1>Hello Guest</h1>
          <p>My name is ORON Cohen, I’m a Full-Stack developer.</p>
          <p>
            This is my project that summarizes React, Express-js, MySQL, JWT
            authentication and etc.
          </p>
          <p>
            I made exactly the same project built with Angular, Express-js,
            MongoDb combined with MySQL (you can find it in my GitHub link
            below).
          </p>
          <p>Hosting for this website made with HEROKU.com and Netlify.com.</p>
          <p>
            I added a link to GitHub below with the local version of the React
            website and the Angular website, if you want to run it on your
            machine:
          </p>
          <ul>
            <li>
              React - MySql Version - you need to install the Database File
              Dump20230119.sql.
            </li>
            <li>
              Angular – MongoDb - MySql - Version - you need to install the
              Database File Dump20230119.sql for the MySql DB & 2 files
              (vacations.json / users.json) for MongoDb.
            </li>
          </ul>
          <h1>About the Project</h1>
          <p>This is a website for tagging vacations by users.</p>
          <p>
            There are 3 different modes (Admin, Registered user, Guest) you need
            to switch modes in order to watch all modes options.
          </p>
          <p>
            You can register as a new user or use one of the user names in the
            table below,
          </p>
          <p>Note that:</p>
          <ul>
            <li>User can see only his favorites vacations.</li>
            <li>Admin cannot UPDATE or DELETE the first 8th vacations.</li>
          </ul>
          <img id="table" src={table} />

          <button
            id="github-link"
            onClick={() =>
              window.open(
                'https://github.com/cohenoron/React-Express-MySql-Mission-v3'
              )
            }
          >
            Go To GitHub
          </button>
        </div>
      </div>
    </>
  )
}

export default About
