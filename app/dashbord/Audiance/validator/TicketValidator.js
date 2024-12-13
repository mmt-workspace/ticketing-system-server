
const db = require("../../../../database/db")
const validator = require("validator")
const {Watch_Check_in_out} = require("./Watch_Check_in_out")





TicketValidator = (req,res)=>{



    const format = req.params.format
   
    
    if(validator.isEmpty(format)) return res.sendStatus(422)
      
    
  
    const sql = "SELECT * FROM audiance WHERE payment_status = ? AND a_id = ? OR mobile = ? AND paid_for != ?;"
    
    const sql2 = "UPDATE audiance SET checkin_out = ? WHERE payment_status = ? AND a_id = ? OR mobile = ?;"
  
  // Example of using the query in Node.js with MySQL
  db.query(sql,[1,format,format,"stall"],(error, results1) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  
  }
  
  
  
       if(results1.length > 0){


         if(results1[0].checkin_out === 1){

           return  res.send({
            status:"already",
             data: `Already Checked In: Ticket type is:  ${results1[0].paid_for}: Stage: 1`
             })

         } 


         if(results1[0].checkin_out === 0 || results1[0].checkin_out === 2){


            db.query(sql2,[1,1,format,format],(error, results) => {

              if (error) {
                console.error('Error executing query:', error);
                return;
              
              }
    
              let fullname = results1[0].fullname
              let ticket_id = results1[0].a_id
              let mobile = results1[0].mobile
              let check_status = "Checked In"
             
              Watch_Check_in_out(fullname,ticket_id,mobile,check_status)
    
              res.send({
                status:"new",
                data: `Checked In: Ticket type is:  ${results1[0].ticketType}`
                 
                 })
    
            })


        } else{

          return  res.send({
            status:"already",
             data: `Ticket has been used: Ticket type is:  ${results1[0].ticketType}: Stage: 1`
             })
 
        }


  
      
      
  
       }else{
  
        res.send({
          status:"not",
          data: "No Match Found..."
    })
     // console.log("No Match Found...")
  
       }
    
  });
  
  
  
  }












  // Check in
  TicketValidatorCheckin = (req,res)=>{



    const format = req.params.format
   
    
    if(validator.isEmpty(format)) return res.sendStatus(422)
      
    
  
    const sql = "SELECT * FROM audiance WHERE payment_status = ? AND a_id = ? OR mobile = ? AND paid_for != ?;"
    
    const sql2 = "UPDATE audiance SET checkin_out = ? WHERE payment_status = ? AND a_id = ? OR mobile = ?;"
  
  // Example of using the query in Node.js with MySQL
  db.query(sql,[1,format,format,"stall"],(error, results1) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  
  }
  
  
  
       if(results1.length > 0){

         if(results1[0].checkin_out === 2){
          
           return  res.send({
            status:"already",
             data: `Already Checked Out: Ticket type is:  ${results1[0].ticketType}: Stage: 2`
             })
         } 

         if(results1[0].checkin_out === 0){
          
          return  res.send({
            status:"already",
            data: `Fresh Ticket Not Yet Use: Ticket type is:  ${results1[0].ticketType}: Stage: 0`
            })
            
        } 


  
        db.query(sql2,[2,1,format,format],(error, results) => {

          if (error) {
            console.error('Error executing query:', error);
            return;
          
          }

          let fullname = results1[0].fullname
          let ticket_id = results1[0].a_id
          let mobile = results1[0].mobile
          let check_status = "Checked Out"
         
          Watch_Check_in_out(fullname,ticket_id,mobile,check_status)

          res.send({
            status:"new",
            data: `Checked Out: Ticket type is:  ${results1[0].ticketType}`
             
             })

        })
      
  
       }else{
  
        res.send({
          status:"not",
          data: "No Match Found..."
    })
     // console.log("No Match Found...")
  
       }
    
  });
  
  
  
  }

  module.exports = {TicketValidator,TicketValidatorCheckin}