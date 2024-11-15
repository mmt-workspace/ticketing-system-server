const nodemailer = require("nodemailer");






const  SendAwardNotice = (email,fname,post,r_ID) =>{

      
    async function main() {
          
       // create reusable transporter object using the default SMTP transport
       let transporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "admin@mmt-ng.com", // generated ethereal user
          pass: "36366360Feb@@mmt", // generated ethereal password
        },
      });
      
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'admin@mmt-ng.com', // sender address
          to: `${email}`, // list of receivers
          subject: 'KADSIECOM Congratulations!', // Subject line
          attachments:[
            {
              filename: `Siecom Logo`,
              path: `./email/siecom.png`
            }
          ],
         // text: "", // plain text body
          html: `<div> 
        <h1
        background-color:  rgb(68, 58, 4);
        color: white;
        padding: 5px;
        text-transform: uppercase;
        text-align: center;
        >Congratulations
        </h1>
        
         <div style=" padding: 0.3em; ">
          <b> Dear ${fname} </b>
           <p style="white-space: pre-line;">

You have been selected for the position of ${post}. and your application ID is : ${r_ID} To proceed, kindly visit our officail website to download your award letter <a herf="https://kadsiecom.mmt-ng.com"  target="__blank">click here </a>.

Please note that all applicants are required to undertake the training within their respective local government areas.

We encourage you to check your dashboard regularly for updates and further instructions.

Once again, congratulations on your selection, and we look forward to seeing you at the training!

Best regards,
</p>    
Sincerely: 
<p><b>Dr Fatima A. Kera</b> </p>
<p>Commissioner I/C Planning, Research & Training (KADSIECOM)</p>

              
          
          </div>   
          `, // html body
      });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // <p>P.S. Follow us on [insert social media links] to stay updated on the latest tech trends and program updates!</p>
       
      }
      
      main().catch(console.error);
  }


  module.exports = SendAwardNotice