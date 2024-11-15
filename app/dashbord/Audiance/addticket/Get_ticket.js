const db = require("../../../../database/db")






Get_ticket = (req,res)=>{

   
    
    const sql = "SELECT * FROM add_ticket;"

    
    db.query(sql,(err,result)=>{

           if(err) console.log(err.message)

           res.send(result) 

    })

    

    

}



module.exports = Get_ticket