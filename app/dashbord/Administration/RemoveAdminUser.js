const db = require("../../../database/db")




const RemoveAdminUser = (req,res) =>{


      const token = req.params.token
      const sql = "DELETE FROM administration WHERE token = ?;"

      db.query(sql,[token],(err,result)=>{


         if(err) return console.log(err.message)
          
            
            
            res.send("Removed From the System!")




      })












}

module.exports = RemoveAdminUser