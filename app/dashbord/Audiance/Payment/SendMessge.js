var request = require('request')



SendMessge = (phone)=>{

 
   let mobile = `234${phone}`
 // console.log(mobile)

var data = {
  "to": mobile,
  "from":"MastrmndTch",
  "sms":`testing testing this is your Ticket ID: 123456 , Additionally, we can use your registered contact number to verify your entry at the gate on the day of the event.`,
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