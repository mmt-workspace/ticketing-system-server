require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require("./database/db")
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path');
const GetPaidList = require("./app/dashbord/Audiance/Payment/GetPaidList")


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

const httpServer = createServer(app);

const io = new Server(httpServer, {  

    cors: {
    origin: ["https://kasuat20.mmt-ng.com","http://127.0.0.1:8800"],
    methods:['GET','POST']
  } }
  )


// All Routes Modules 
   const auth = require("./route/auth")
   const public = require("./route/public")
const {authenticator} = require("./auth/jwt")

  
 
io.on("connection",(socket)=>{
    // update posted producted
    socket.on("update_client_side_products", (arg) => {
          socket.broadcast.emit("reupdate",arg)
      })
  })

  
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
 

httpServer.listen(port, () => console.log(`ticketing Server is running on port ${port}!`))


 db.connect((err)=>{
    if(err) return console.log(err)

    console.log('DataBase Connected')
}) 
