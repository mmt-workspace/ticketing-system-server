
const db = require("../../../database/db")
const validator = require("validator")






GetPaidAudiance = (req,res)=>{



    const format = req.params.format
   
  
    if(validator.isEmpty(format)) return res.sendStatus(422)
      
    
  
    const sql = "SELECT * FROM audiance WHERE payment_status = ? AND a_id = ? OR mobile = ?;"
  
  // Example of using the query in Node.js with MySQL
  db.query(sql,[1,format,format],(error, results) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  
  }
  
  
  
       if(results.length >0){
  
        res.send({
              status:true,
              data: results
        })
  
       }else{
  
        res.send({
          status:false,
          data: "No Match Found..."
    })
     // console.log("No Match Found...")
  
       }
    
  });
  
  
  
  }


  module.exports = GetPaidAudiance