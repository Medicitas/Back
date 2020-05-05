import express from 'express';

import {createAdmin,getAllUsers} from '../controllers/admincontroller';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// admin Routes

router.post('/admin', /*verifyAuth,*/ createAdmin);
router.get('/admin/userlist',/* verifyAuth,*/ getAllUsers);

export default router;