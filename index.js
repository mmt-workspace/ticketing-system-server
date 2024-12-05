require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require("./database/db")
const path = require('path');



const port = 8800

const app = express();
  
  
/// ,
app.use(cors( 
    {
        origin:  ["https://kasuat20.mmt-ng.com","http://localhost:3000"],
        credentials: true
    }
))

/* app.use("/files",express.static(__dirname,+"assets/MemberPictures/")) */
  
app.use(cookieParser())
   
app.use(express.json())

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));



// All Routes Modules 
   const auth = require("./route/auth")
   const public = require("./route/public")
const {authenticator} = require("./auth/jwt")

  
 

  
// Auth Route  authenticator
  app.use('/auth',auth)

// Public
  app.use("/pub",public)

 
// files  
app.use("/get_file/",express.static(path.join(__dirname,"assets/certificates")))
app.use("/get_pic/",express.static(path.join(__dirname,"assets/pictures")))

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) 
 

app.listen(port, () => console.log(`ticketing Server is running on port ${port}!`))


 db.connect((err)=>{
    if(err) return console.log(err)

    console.log('DataBase Connected')
}) 


// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  if (err.message.includes("Can't add new command when connection is in closed state")) {
      console.error("Critical error detected: ", err.message);
      process.exit(1); // Exit to trigger PM2 restart
  } else {
      console.error("Unhandled exception: ", err.message);
  }
});

// Catch unhandled promise rejections (optional)
process.on('unhandledRejection', (reason, promise) => {
  console.error("Unhandled rejection at: ", promise, "reason: ", reason);
});

// console.log("Error handlers initialized.");

