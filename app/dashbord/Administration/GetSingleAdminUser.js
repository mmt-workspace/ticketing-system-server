const db = require("../../../database/db")




// Get admin User information

GetSingleAdminUser = (req,res) =>{
 
       const token = req.params.token

    const sql = "SELECT * FROM administration WHERE token = ? ;"


    db.query(sql,[token],(err,result)=>{


     if(err)  return console.log(err.message)
         
       res.send(result)       
    })


}



module.exports = GetSingleAdminUser