const db = require("../../../../database/db")






Watch_Check_in_out = (fullname,ticket_id,mobile,check_status) =>{

         
        const sql = "INSERT INTO wtach_checked_in_out(fullname,ticket_id,mobile,check_status) VALUES(?,?,?,?);"

    
       db.query(sql,[fullname,ticket_id,mobile,check_status],(err,result) =>{

            if(err) return console.log(err.message)

            console.log("record check in or out")
       })
    


}


fetch_Watch_Check_in_out = (req,res)=>{


      const sql = "SELECT * FROM wtach_checked_in_out;"


      db.query(sql,(err,result)=>{

             if(err) console.log(err.message)

                res.send(result)
      })


}

module.exports = {Watch_Check_in_out,fetch_Watch_Check_in_out}