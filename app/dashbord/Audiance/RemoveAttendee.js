const db = require("../../../database/db")




RemoveAttendee = (req,res) =>{

      
      
      const token = req.params.token
    
      const sql = "DELETE FROM audiance WHERE user_token = ?;"

      db.query(sql,[token],(err,result)=>{


         if(err) return console.log(err.message)
           
            
            res.send("Attendee Removed From the System!")


      })






}

module.exports = RemoveAttendee