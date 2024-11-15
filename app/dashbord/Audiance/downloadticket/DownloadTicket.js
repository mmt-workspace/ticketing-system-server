const PDFDocument = require('pdfkit');
const path = require('path');
const db = require("../../../../database/db")







DownloadTicket = (req, res) => {


    const token = req.params.token;

  // Fetch user details from the database
  const sql = "SELECT * FROM audiance WHERE payment_status = ? AND a_id = ?;";
  db.query(sql, [1, token], (err, result) => {
    if (err) return res.status(500).send(err.message);
    if (!result.length) return res.status(422).send("No ticket found.");

    const user = result[0];
    const isStall = user.paid_for === 'stall';
    const doc = new PDFDocument({ size: 'A4', margins: { top: 50, left: 50, right: 50, bottom: 50 } });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${user.paid_for}_ticket.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Header with Banner
    doc.rect(0, 0, doc.page.width, 80).fill('#4CAF50');
    doc.image(path.join(__dirname, 'st.JPG'), 40, 20, { width: 60 });
    doc.fillColor('#FFFFFF').fontSize(24).text('KASU@20 ANNIVERSARY CELEBRATION', 120, 30, { align: 'center' });
    
    // Separator Line
    doc.moveTo(50, 100).lineTo(doc.page.width - 50, 100).stroke('#4CAF50');

    // Main Title
    doc.moveDown(1).fontSize(18).fillColor('#333333').text(
      isStall ? 'Stall Booking Confirmation' : 'Event Ticket',
      { align: 'center', underline: true }
    );

    // User Details Section
    doc.moveDown(2);
    doc.fontSize(14).fillColor('#000000').text('User Details:', { underline: true });
    doc.moveDown(0.5).fontSize(12).text(`Ticket ID: ${user.a_id}`);
    doc.text(`Paid For: ${isStall ? 'Stall' : 'Event Ticket'}`);
    doc.text(`Fee: ₦ ${user.registr_fee}`, { color: '#4CAF50' });

    // Conditional Fields
    if (isStall) {
      doc.fontSize(12).fillColor('#0000FF').text(`Business Name: ${user.bussines_name}`, { bold: true });
    } else {
      doc.fontSize(12).fillColor('#0000FF').text(`Membership Type: ${user.ticketType}`, { bold: true });
    }

    // Event Details Section
    doc.moveDown(1);
    doc.fontSize(14).fillColor('#333333').text('Event Details:', { underline: true });
    doc.moveDown(0.5).fontSize(12).text('Date: Friday, 29/November/2024');
    doc.text(isStall ? 'Time: 9 AM' : 'Time: 5 PM');
    doc.text("Location: UMARU MUSA YAR'ADUA Event Hall");

    // Footer Section
    doc.moveDown(2);
    doc.rect(50, doc.y, doc.page.width - 100, 80).fill('#F5F5F5').stroke('#4CAF50');
    doc.fillColor('#333333').fontSize(10).text(
      'This software is developed by MastermindTech. We specialize in creating software solutions tailored to businesses. Reach us through WhatsApp: 07040768898.',
      60,
      doc.y + 10,
      { align: 'center', width: doc.page.width - 120 }
    );

    // Watermark
    doc.opacity(0.1).fontSize(50).fillColor('#300202 ').text('MastermindTech', 150, doc.page.height / 2, {
      rotate: -45,
    });

    // Finalize PDF
    doc.end();
  });



  
  }



module.exports = DownloadTicket