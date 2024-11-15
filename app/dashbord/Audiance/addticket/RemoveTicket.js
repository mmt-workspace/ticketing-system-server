const db = require("../../../../database/db")




RemoveTicket = (req,res) =>{


      const token = req.params.token
    
      const sql = "DELETE FROM add_ticket WHERE token = ?;"

      db.query(sql,[token],(err,result)=>{


         if(err) return console.log(err.message)
          
            
            
            res.send("Ticket Removed From the System!")




      })






}

module.exports = RemoveTicket