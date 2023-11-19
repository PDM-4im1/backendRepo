import express from 'express';
import { saveMoyenDeTransport} from '../controllers/MoyendeTransportController.js';

const router = express.Router(); 

router 
    .route('/saveMoyenDeTransport')
    .post(saveMoyenDeTransport); 



    
    export default router ;