const db = require("../../../database/db")
const validetor = require("validator")







CheckMobileAudiance = (req,res,next) =>{



    const {mobileNumber} = req.body
  
 

     if(validetor.isEmpty(mobileNumber.toString())) return res.sendStatus(422)

    const sql = "SELECT mobile FROM audiance WHERE mobile = ?;"



    db.query(sql,[mobileNumber],(err,result) =>{


         if(err) return console.log(err)



         if(result.length > 0){

               res.send({
                   
                   statusText: "Mobile number been used",
                   status: false
               })
               return
         }

          // Move to next middleware
          next()


    })



}

CheckMobileBeforePay = (req,res,next) =>{



    const {mobileNumber} = req.body

    if(validetor.isEmpty(mobileNumber.toString())) return res.sendStatus(422)




    const sql = "SELECT mobile FROM audiance WHERE mobile = ?;"



    db.query(sql,[mobileNumber],(err,result) =>{


         if(err) return console.log(err)



         if(result.length > 0){

               res.send({
                   
                   statusText: "Mobile number been used",
                   status: false
               })
               return
         }

          // Move to next middleware
          res.send({
                   
            statusText: "Processing Payment Getway...",
            status: true
        })


    })






}



module.exports = {CheckMobileAudiance,CheckMobileBeforePay}