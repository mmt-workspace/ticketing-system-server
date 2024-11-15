const nodemailer = require("nodemailer");






const  SingUp_Welcome_Messg = (email,fname) =>{

      
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
          subject: 'KADSIECOM Welcome Message', // Subject line
        //   attachments: [""],
         // text: "", // plain text body
          html: `<div> 
        <h1
        background-color:  rgb(68, 58, 4);
        color: white;
        padding: 5px;
        text-transform: uppercase;
        text-align: center;
        >Welcome Message from the Chairman KADSIECOM
        </h1>
        
         <div style=" padding: 0.3em; ">
          <b> Dear ${fname} </b>
           <p style="white-space: pre-line;">


  
Welcome to the Kaduna State Independent Electoral Commission (Kad-Siecom) portal for the recruitment of Election Officials for the 2024 Local Government Council Elections. We are honored to have you express interest in serving as an Adhoc Staff member during this critical process.


Your commitment to contribute to a creadable election is invaluable, not only to the people of Kaduna State but to the entire nation as a whole . The recruitment process, which opens, is designed to identify qualified individuals who will uphold the highest standards of integrity and professionalism in the conduct of these elections.


As an applicant, you may be considered for various roles, including Supervisory Presiding Officer (SPO), Presiding Officer (PO), Assistant Presiding Officer (APO), and Poll Clerk (PC). Each role is crucial to the success of the electoral process, and we trust that you will approach your duties with diligence and dedication.



We encourage you to carefully review the requirements and responsibilities associated with each position to ensure you are fully prepared for the tasks ahead. The recruitment window will close on September ___, 2024, so please ensure that your application is submitted before the deadline.


Thank you for your willingness to serve Kaduna State and Nigeria as a whole. Together, we can ensure that the 2024 Local Government Councils Election are conducted smoothly, transparently, and in a manner that reflects the true will of the people.

</p>    
Sincerely: 
<p><b>Hajiya Hajara Mohammad</b> </p>
<p>Chairman, Kaduna State Independent Electoral Commission (Kad-Siecom)</p>

          <p>Thank you for your interest in KADSIECOM.</p> 
              
          
          </div>   
          `, // html body
      });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // <p>P.S. Follow us on [insert social media links] to stay updated on the latest tech trends and program updates!</p>
       
      }
      
      main().catch(console.error);
  }


  module.exports = SingUp_Welcome_Messg