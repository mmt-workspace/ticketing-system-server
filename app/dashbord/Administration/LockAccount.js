const db = require("../../../database/db")




const LockAccount = (req,res) =>{


      const {value,token} = req.body
      
      const sql = "UPDATE administration SET acc_lock = ? WHERE token = ?;"

      db.query(sql,[value,token],(err,result)=>{


         if(err) return console.log(err.message)
          

            if(value === 1){
                res.send(" Account is Locked!")


            }else{
                res.send(" Account is Un-Locked!") 
            }
            
              


  

      })







}

module.exports = LockAccount