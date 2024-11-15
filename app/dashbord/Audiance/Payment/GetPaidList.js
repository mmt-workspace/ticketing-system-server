const https = require('https');
const db = require("../../../../database/db")
const SendMessge = require("./SendMessge")


Update_audiance_statll = (reference_id,user_token,a_id,ownertype,mobileNumber,ticket_card_token)=>{


    const sql = "UPDATE audiance SET ref_id_pay = ?, payment_status = ? , ownertype = ? WHERE user_token = ?;"
    const status = 1
    db.query(sql,[reference_id,status,ownertype,user_token],(err,result)=>{


        if(err) return console.log(err)

       //   SendMessge(mobileNumber)
       //   Update_reduce_sit(ticket_card_token)

       console.log("Paid and Updated")

    })
    
    
    


}


Update_reduce_sit = (ticket_card_token)=>{


  const sql = "UPDATE add_ticket SET limt = limt - 1, WHERE token = ?;"
 
  db.query(sql,[ticket_card_token],(err,result)=>{

    
    
      if(err) return console.log(err)



  })
  
  
  


}




Log_tbl = (a_id)=>{

   
    const sql = "INSERT INTO log_tbl(user_id) VALUES(?);"


     db.query(sql,[a_id],(err,result)=>{

              if(err) return console.log(err)

                console.log("ref id not match payment issue")
     })


}


const GetPaidList = (reference_id,transaction,status,user_token,a_id,mobileNumber,ticket_card_token) => {



  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference_id}`, // Remove ':' before the transaction ID
    method: 'GET',
    headers: {
      Authorization: `Bearer sk_test_8002a75f23dfd6fbc2e7b173b9b87424cf99655a`, // Use an environment variable for the key
    },
  };

  const req = https.request(options, (res) => {


    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        
        const parsedData = JSON.parse(data);
          
        
               
         if(reference_id === parsedData.data.reference && status === parsedData.data.status){
               
            

             Update_audiance_statll(reference_id,user_token,a_id,parsedData.data.status,mobileNumber,ticket_card_token)

         
         }else{

            Log_tbl(a_id)
         }
           
       
      

      } catch (error) {
        console.error('Error parsing response:', error);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Request error:', error);
  });

  req.end(); // Send the request
};

module.exports = GetPaidList;