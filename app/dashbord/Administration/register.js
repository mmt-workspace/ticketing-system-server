const db = require("../../../database/db")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const RanDomID = require("../../../functions/RandomID")
const TokensGenerator = require("../../../functions/TokensGenerator")
const CreateJwt = require("../../../auth/CreateJwt")
const configRoute = require("./configRoute")
const SendPassward = require("../../../email/SendPassward")




// Register administration
RegisterAdministration = async(req,res) =>{

   
    const {firstName,lastName,email,mobileNumber,userType} =  req.body
 
     // Validate 
     if(validator.isEmpty(firstName.trim()) || validator.isEmpty(lastName.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(userType.trim()) || validator.isEmpty(mobileNumber.trim())){

          console.log("no empty input allow")
          res.sendStatus(422)
          return
     }

     if(!validator.isEmail(email)){
         console.log("not email")
         res.sendStatus(422)
          return
     }

     if(!validator.isNumeric(mobileNumber)){

          console.log("not a number")
          res.sendStatus(422)
           return
     }

     const  user_roles = [
          "Administrator",
          "Manage",
          "Validator"
      ]

       let acc_level
      
       switch(userType) {

          case user_roles[0]:
            // code block
            acc_level = 100
            break;
          case user_roles[1]:
            // code block
            acc_level = 90
            break;
          case user_roles[2]:
               // code block
               acc_level = 80
              break;
              default:
                   // code block
             res.sendStatus(422)
             return
        }

      //  const  passwrd = RanDomID(32996582).toString()
        const  passwrd = 12345
        const saltRound = 10
        let hashPasswrd = await bcrypt.hash(passwrd,saltRound)

       
  
       const sql = "INSERT INTO administration(fname,lname,email,passwrd,mobile,usertype,acc_level,token) VALUES(?,?,?,?,?,?,?,?);"
       const userToken = TokensGenerator(10)
       const list = [firstName,lastName,email,hashPasswrd,mobileNumber,userType,acc_level,userToken]


    db.query(sql,list,(err,result) =>{

          if(err) return console.log(err.message)
              
       // Create Table for JWT 
        CreateJwt(userToken)
        // configRoute
        configRoute(userToken,userType)
        // Send login details to user email
       // SendPassward(email,passwrd)

          res.send({
               statusText:"Registered",
               status: true
          
          })
            
          console.log(`Firstname: ${firstName} and Passward : ${passwrd}`)

    })

     
}


module.exports  = RegisterAdministration