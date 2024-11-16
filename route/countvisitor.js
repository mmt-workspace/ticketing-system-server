const db = require("../database/db")







CountVisitor = (req,res)=>{


    
    const ip = req.clientIp;

    db.query("INSERT INTO visitors (ip_address) VALUES (?)", [ip], (err) => {
      if (err) {
        console.error("Error logging visit:", err);
        return res.status(500).send("Error logging visit");
      }
      res.status(200)
     
    });

}


GetCountVisitor = (req,res)=>{


    db.query("SELECT COUNT(*) AS count FROM visitors", (err, results) => {
        if (err) {
          console.error("Error fetching count:", err);
          return res.status(500).send("Error fetching count");
        }

       
        res.status(200)
      });


}


module.exports = {CountVisitor,GetCountVisitor}