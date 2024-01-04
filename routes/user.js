import express from 'express';
import { deleteOnce,signinAdmin, patchOnce, putOnce, signin,signup } from '../controllers/User.js';

const router = express.Router(); 

router
    .route('/signin')
    .post(signin)
    router
    .route('/signinadmin')
    .post(signinAdmin)

router 
    .route('/signup')
    .post(signup); 




export default router ;

