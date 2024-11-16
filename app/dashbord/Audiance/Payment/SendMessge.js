var request = require('request')



SendMessge = (phone,ID)=>{

 
      let mobile 
      if(phone.startsWith("0")){

           mobile = `234${phone.slice(1)}`

      }
    

var data = {
  "to": mobile,
  "from":"MastrmndTch",
  "sms":` KASU@20 ANNIVERSARY ; Ticket ID: ${ID} ; Download your ticket using Ticket ID or your registered contact number in the website. Event Date: 29-November-2024`,
  "type":"plain",
  "api_key":"TLIBiuFyUgDTqfTXSryJLDqLnBlYPsyiMdZDTGPPPhBnVebeOBRPDqRtcmIGTt",
  "channel":"generic",
 
};

var options = {
'method': 'POST',
'url': 'https://v3.api.termii.com/api/sms/send',
'headers': {
'Content-Type': "application/json"
},
body: JSON.stringify(data)

};
request(options, function (error, response) { 

if (error) throw new Error(error);
var responseBody = JSON.parse(response.body);
  // Log the message field from the response
 console.log(responseBody.message);

    
 // res.send(responseBody.message)


})

 
  


} 






module.exports = SendMessge