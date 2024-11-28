const db = require("../../../database/db")





GetconfigRoute = (req,res)=>{

 
    const token = req.params.token
     
    
    
    const sql = "SELECT usertype FROM configRoute WHERE user_token = ?;"

    
    db.query(sql,[token],(err,result)=>{

           if(err) console.log(err.message)

           res.send(result) 

    })

}
  


module.exports = GetconfigRoute