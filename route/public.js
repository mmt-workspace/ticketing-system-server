const router = require("express").Router()
const MakePayment = require("../app/MakePayment/MakePayment")
const CheckEmail = require("../app/MakePayment/CheckEmail")
const CheckNumber = require("../app/MakePayment/CheckNumber")
const Add_Audiance = require("../app/dashbord/Audiance/Add_Audiance")
const {CheckMobileAudiance,CheckMobileBeforePay} = require("../app/dashbord/Audiance/CheckMobileAudiance")
const GetPaidAudiance = require("../app/dashbord/Audiance/GetPaidAudiance")
const DownloadTicket = require("../app/dashbord/Audiance/downloadticket/DownloadTicket")
const {CountVisitor} = require("./countvisitor")
//const Signup = require("../app2/applicants/SignUp/Signup")
/* const CheckEmailApplicant = require("../app2/applicants/SignUp/CheckEmailApplicant")
const CheckMobileApplicant = require("../app2/applicants/SignUp/CheckMobileApplicant")
const LoginApplicant = require("../app2/applicants/login/LoginApplicant")
const CheckEmptyEmail = require("../app2/applicants/login/CheckEmptyEmail") */
const AdminULogin = require("../app/dashbord/login/AdminULogin")
/* const {GetRefreshTokens} = require("../auth/jwt")
const GetLocalGov = require("../app2/Setting/Get/GetLocalGov")
const GetWards = require("../app2/Setting/Get/GetWards")
const {Get_Awarded_Applicant} = require("../app2/applicants/award/Get_Applicants_By_local")
const {Get_Open_Application} = require("../app2/Setting/OpenApplication")
const ExportContact = require("../app2/applicants/Export/ExportContact") */

// Make Payment token route
router.post("/make_payment",CheckEmail,CheckNumber,MakePayment)

// Sign Up
//router.post("/signup",CheckEmailApplicant,CheckMobileApplicant,Signup)

// router.post("/up",CheckEmailApplicant,CheckMobileApplicant,Signup)
// copy up
// LoginApplicant

// router.post("/login_applicant",CheckEmptyEmail,LoginApplicant)

// router.post("/login_applicant",CheckEmptyEmail,LoginApplicant)

// login admin user 
router.post("/admin_u_login",AdminULogin)
/* // clienttokens
router.get("/clienttokens",GetRefreshTokens)
// Get Local Gove 
router.get("/get_local_gov",GetLocalGov)
// Get wards
router.get("/get_wards",GetWards)
// Get_Awarded_Applicant
router.get("/get_awarded_applicant/:format",Get_Awarded_Applicant)
// OpenApplication
router.get("/get_open_application",Get_Open_Application)
// Get_All_Not_Sub_Applicant
router.get("/get_contact/:lga/:post",ExportContact)
 */
// Route to generate and download the PDF
// Add_Audiance
router.post("/add_audiance",CheckMobileAudiance,Add_Audiance)
// CheckMobileBeforePay
router.post("/check_number",CheckMobileBeforePay)
// GetPaidAudiance
router.get("/get_applicant/:format",GetPaidAudiance)


router.get('/download-ticket/:token',DownloadTicket);
router.post("/log-visit",CountVisitor)


module.exports = router;
 







module.exports = router
