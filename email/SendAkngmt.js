const nodemailer = require("nodemailer");






const  SendPassward = (email,fname,ID) =>{

      
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
          subject: 'KADSIECOM Application Acknowledgement', // Subject line
        //   attachments: [""],
         // text: "", // plain text body
          html: `<div> 
        <h1
        background-color:  rgb(68, 58, 4);
        color: white;
        padding: 5px;
        text-transform: uppercase;
        text-align: center;
        >KADSIECOM Confirmation of Successful Application
        </h1>
        
         <div style=" padding: 0.3em; ">
          <b> Dear ${fname} </b>
           <p>

We are pleased to inform you that your application has been successfully submitted and is currently under review. Please take note of your registration ID: ${ID}. This ID will be used for verification and tracking the status of your application.

If you have any questions or need further assistance, please feel free to contact us.




            </p>    

          <p>Thank you for your interest in KADSIECOM.</p> 
              
 
          

             <p>
             Best regards, KADSIECOM Team
             </p>   

          
          </div>   
          `, // html body
      });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // <p>P.S. Follow us on [insert social media links] to stay updated on the latest tech trends and program updates!</p>
       
      }
      
      main().catch(console.error);
  }


  module.exports = SendPassward