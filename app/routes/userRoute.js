import express from 'express';

import { createUser, signinUser,} from "../controllers/usercontroller";
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// user Routes

router.post('/user', verifyAuth, createUser);
router.post('/signin', signinUser);
export default router;