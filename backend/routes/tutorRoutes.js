const express = require('express');
const tutorController = require('../controllers/tutorController');
const upload = require('../utils/multur');
const tutorRoute = express.Router();



tutorRoute.post('/register_tutor', tutorController.tutorRegister);
tutorRoute.post('/login',tutorController.tutorLogin);
tutorRoute.get('/getTutors',tutorController.getTutorsList);
tutorRoute.post('/addTutor',tutorController.addTutor);
tutorRoute.patch('/blockTutor/:id',tutorController.blockTutor);
tutorRoute.patch('/unblockTutor/:id',tutorController.unblockTutor);
tutorRoute.put('/updateTutor/:id', upload.single('image'),tutorController.updateTutor);;
tutorRoute.patch('/verifyTutor/:id',tutorController.verifyTutor);
tutorRoute.get('/getTutor/:id',tutorController.getTutor);
tutorRoute.delete('/deleteTutor/:id',tutorController.deleteTutor);
tutorRoute.get('/getTutorStudent',tutorController.getTutorStudent);
tutorRoute.get('/markCompleted/:id',tutorController.markCompleted);
tutorRoute.get('/blockStatus',tutorController.blockStatus);
tutorRoute.get('/getTutorUpcomingClasses',tutorController.getTutorUpcomingClasses)
tutorRoute.get('/searchTutor',tutorController.searchTutor);
tutorRoute.get('/getTutuorData',tutorController.getTutuorData);
tutorRoute.get('/getOldChat/:id',tutorController.getOldChat);

module.exports = tutorRoute;