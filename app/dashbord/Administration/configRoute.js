const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



configRoute = (ref_tokens,usertype)=>{


         const sql = "INSERT INTO configRoute(user_token,usertype) VALUES(?,?)";
        
         const list = [ref_tokens,usertype]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("configRoute table inserted")
            })

}

module.exports =  configRoute
