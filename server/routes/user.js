const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

router.get('/home', userController.view);
router.post('/', userController.find);
router.post('/result', userController.finds);
router.post('/LogUpdate', userController.updateMark)

router.get('/', userController.Login);
router.post('/login', userController.login);

router.get('/result', userController.views);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/addresult', userController.forms);
router.post('/addresult', userController.creates);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/viewresult/:id', userController.viewalls);
router.get('/:id',userController.delete);

router.post('/addsubject', userController.addsubject);
router.get('/viewLog/:id',userController.viewLog)

router.get('/viewAttendance/:id',userController.getAttendnace)
router.post('/emailAlerts',userController.emailAlerts)
module.exports = router;