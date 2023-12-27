import express from 'express';
import { deleteOnce, patchOnce, putOnce, signin,signup } from '../controllers/User.js';

const router = express.Router(); 

router
    .route('/signin')
    .post(signin)

router 
    .route('/signup')
    .post(signup); 

router
    .route('/:email')
    .put(putOnce);

router  
    .route('/:email')
    .patch(patchOnce);

router 
    .route('/:email')
    .delete(deleteOnce);



export default router ;

