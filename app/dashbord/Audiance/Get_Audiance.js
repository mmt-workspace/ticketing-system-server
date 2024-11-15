const db = require("../../../database/db")






Get_Audiance = (req,res)=>{

 

    const status = 1
    
    const sql = "SELECT * FROM audiance WHERE payment_status = ? ;"

    
    db.query(sql,[status],(err,result)=>{

           if(err) console.log(err.message)

           res.send(result) 

    })

    

    




}



module.exports = Get_Audiance