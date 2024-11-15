const db = require("../../../../database/db")
const TokensGenerator = require('../../../../functions/TokensGenerator')




addticket = (req,res) =>{



    const {ticketType,price,limit,doorOpen,holdDate} = req.body
    
    
    const sql = "INSERT INTO add_ticket(ticket_type,price,limt,doorOpen,holdDate,token) VALUES(?,?,?,?,?,?);"
    const token = TokensGenerator(12)
    const list = [ticketType,price,limit,doorOpen,holdDate,token]


   db.query(sql,list,(err,result)=>{
      
      if(err) console.log(err.message)

      res.send({
            status: true,
            statusText: "Ticket Successfully Added"
      })


          
   })





}










module.exports = addticket