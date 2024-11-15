const db = require("../../../database/db")
const TokensGenerator = require('../../../functions/TokensGenerator')
const RandomID = require('../../../functions/RandomID')
const GetPaidList = require("./Payment/GetPaidList")





Add_Audiance = (req,res)=>{


    
      const {fullName,mobileNumber,state,ticketType,paid_for,ownertype,businessName,stallPrice,ticketfee,reference} = req.body

           if(mobileNumber.trim() === ""){

               res.sendStatus(244)
           }
       
        let sql 
        let list

        const user_token = TokensGenerator(12)
        const a_id = RandomID(39217478)
        const payment_status = 1
        const stallFee = stallPrice.slice(stallPrice.lastIndexOf("-") + 1)
       // const sliceticketType =   ticketType.slice(0,user.ticketType.lastIndexOf("-"))
        
  
          if(paid_for === "free ticket"){

             sql = "INSERT INTO audiance(fullname,mobile,stateoforigin,ticketType,paid_for,ownertype,a_id,user_token,payment_status) VALUES(?,?,?,?,?,?,?,?,?);"
             list = [fullName,mobileNumber,state,ticketType,paid_for,ownertype,a_id,user_token,payment_status]

          }
          
          if(paid_for === "ticket"){
                  sql = "INSERT INTO audiance(fullname,mobile,stateoforigin,ticketType,paid_for,ownertype,registr_fee,a_id,user_token,payment_status) VALUES(?,?,?,?,?,?,?,?,?,?);"
                  list = [fullName,mobileNumber,state,ticketType,paid_for,ownertype,ticketfee,a_id,user_token,payment_status]
          }
          
          if(paid_for === "stall"){

             sql = "INSERT INTO audiance(fullname,stateoforigin,bussines_name,mobile,registr_fee,paid_for,ownertype,a_id,user_token,payment_status) VALUES(?,?,?,?,?,?,?,?,?,?);"
             list = [fullName,state,businessName,mobileNumber,stallFee,paid_for,ownertype,a_id,user_token,payment_status]
          }

    
            

       db.query(sql,list,(err,result)=>{

          
          if(err) console.log(err.message)

             if(paid_for === "ticket" || paid_for === "stall"){

                 //  console.log(reference)
                   GetPaidList(reference.reference,reference.transaction,reference.status,user_token,a_id,mobileNumber)

             }
   
          res.send({
                status: true,
                statusText: "Registered Successfully"
          })

              
       })





}



module.exports = Add_Audiance