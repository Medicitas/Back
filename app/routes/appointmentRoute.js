import express from 'express';

import { addAppointment, getAllAppointments, } from "../controllers/appointmentcontroller";
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// appointment Routes

router.post('/appointment', /*verifyAuth,*/ addAppointment);
router.get('/appointmentlist', /*verifyAuth,*/ getAllAppointments);
export default router;