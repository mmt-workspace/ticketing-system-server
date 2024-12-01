const router = require("express").Router()

const Add_Audiance = require("../app/dashbord/Audiance/Add_Audiance")
const {CheckMobileAudiance,CheckMobileBeforePay} = require("../app/dashbord/Audiance/CheckMobileAudiance")
const GetPaidAudiance = require("../app/dashbord/Audiance/GetPaidAudiance")
const DownloadTicket = require("../app/dashbord/Audiance/downloadticket/DownloadTicket")
// const {CountVisitor} = require("./countvisitor")
const AdminULogin = require("../app/dashbord/login/AdminULogin")




// login admin user 
router.post("/admin_u_login",AdminULogin)

// Add_Audiance
router.post("/add_audiance",CheckMobileAudiance,Add_Audiance)
// CheckMobileBeforePay
router.post("/check_number",CheckMobileBeforePay)
// GetPaidAudiance
router.get("/get_applicant/:format",GetPaidAudiance)


router.get('/download-ticket/:token',DownloadTicket);

// router.post("/log-visit",CountVisitor)


module.exports = router;
 







module.exports = router
