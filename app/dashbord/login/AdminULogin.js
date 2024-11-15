const db = require("../../../database/db")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const {CreatAccessToken,CreateRefreshToken} = require("../../../auth/jwt")



AdminULogin = (req,res)  =>{


   const {email,passwrd} = req.body


   if(validator.isEmpty(email) || validator.isEmpty(passwrd)){
    res.sendStatus(422)
    console.log("Empty input not allow")
    return
}

if(!validator.isEmail(email)){
          res.sendStatus(422)
          console.log("not an email")
          return
    }


  const sql = "SELECT email,passwrd,token,acc_lock FROM administration WHERE email = ?;"


   db.query(sql,[email],async(err,result) =>{

          if(err) return console.log(err.message)
             
           

            if(!result.length > 0) {

                  res.send({
                      text:"Wrong Email or Password",
                      status:false
                  })
                  console.log("wrong email")
                  return
            }else{

               const DbPass = result[0].passwrd
               const token = result[0].token
               const Dehash = await bcrypt.compare(passwrd,DbPass)

                // Check account restriction before login
               if(result[0].acc_lock === 1) return   res.send({ text:"Internal Error / Network Error", status:false })

                 if(Dehash){
                    
                     // Set JWT Tokens
                   const accesstoken =    CreatAccessToken(token)
                   const createrefreshtoken =    CreateRefreshToken(token)

                    res.send({
                        text:"Success",
                        status:true,
                         accesstoken,
                         Usertoken: token,
                       // createrefreshtoken
                    })
                  //  console.log("You'er logged in")

                 }else{

                    res.send({
                        text:"Wrong Email or Password",
                        status:false
                    })
                 //  console.log("wrong Password")
                    return

                 }


            }


   })




}




module.exports = AdminULogin