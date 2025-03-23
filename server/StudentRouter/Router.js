const express = require('express');
const router = express.Router();
const {middleWare} = require('../middleWare/StudentMiddleWare')
const {getLoginPage,Home,DoLogin,addLab,getMyLab,addAttendance,logout,AttendanceView,location} = require('../StudentController/StudentController')

router.get('/Login',getLoginPage)
router.get('/Home',Home)

router.post('/Login',DoLogin)
router.post('/add-lab',middleWare,addLab)

router.get('/get-myLab',middleWare,getMyLab)

router.post('/markAttendance',middleWare,addAttendance)
router.get('/AttendanceView',AttendanceView)
router.get('/location',location)
router.get('/logout',logout)
module.exports = router;
