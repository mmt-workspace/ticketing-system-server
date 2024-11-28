const router = require('express').Router()
const RegisterAdministration = require("../app/dashbord/Administration/register")
const RemoveAdminUser = require("../app/dashbord/Administration/RemoveAdminUser")
const LockAccount =  require("../app/dashbord/Administration/LockAccount")
const GetAdminUsers= require("../app/dashbord/Administration/GetAdminUsers")
const CheckEmail = require("../app/dashbord/Administration/CheckEmail")
const CheckMobile = require("../app/dashbord/Administration/CheckMobile")
const Add_Audiance = require("../app/dashbord/Audiance/Add_Audiance")
const {CheckMobileAudiance} = require("../app/dashbord/Audiance/CheckMobileAudiance")
const Get_Audiance = require("../app/dashbord/Audiance/Get_Audiance")
const addticket = require("../app/dashbord/Audiance/addticket/addticket")
const Get_ticket = require("../app/dashbord/Audiance/addticket/Get_ticket")
const RemoveTicket = require("../app/dashbord/Audiance/addticket/RemoveTicket")
const RemoveAttendee = require("../app/dashbord/Audiance/RemoveAttendee")
const GetconfigRoute = require("../app/dashbord/Administration/GetconfigRoute")
const GetSingleAdminUser = require("../app/dashbord/Administration/GetSingleAdminUser")
const {UpdatePassword,CheckEmailAdmin,CheckPasswordAdmin} = require("../app/dashbord/Administration/UpdatePassward")




// Rigister admin users and admin
router.post("/register_administration",CheckEmail,CheckMobile,RegisterAdministration)
// RemoveAdminUser
router.delete("/remove_admin_user/:token",RemoveAdminUser)
//gets_single_admin_user
router.get("/gets_single_admin_user/:token",GetSingleAdminUser)
// LockAccount
router.put("/lock_account",LockAccount)
// get admin users
router.get("/get_admin_users",GetAdminUsers)
// Add_Audiance
router.post("/add_audiance",CheckMobileAudiance,Add_Audiance)
// RemoveAttendee
router.delete("/remove_attendee/:token",RemoveAttendee)
// Get_Audiance
router.get("/get_audiance",Get_Audiance)
// addticket
router.post("/addticket",addticket)
// Get_ticket
router.get("/get_ticket",Get_ticket)
// remove ticket
router.delete("/remove_ticket/:token",RemoveTicket)
// Get admin route
router.get("/getconfig_route/:token",GetconfigRoute)
// Update administration passward
router.post("/update_passward",CheckEmailAdmin,CheckPasswordAdmin,UpdatePassword)



 





module.exports = router  