import express from 'express';
import { saveMoyenDeTransport,findAllMoyenDeTransport,findAllDrivers,findAllUsers,findAllCovoiturages,saveconducteur} from '../controllers/MoyendeTransportController.js';

const router = express.Router(); 

router 
    .route('/saveMoyenDeTransport')
    .put(saveMoyenDeTransport); 
router
    .route('/findAllCovoiturages/:id_user')
    .get(findAllCovoiturages);

router 
    .route('/findAllMoyenDeTransport')
    .get(findAllMoyenDeTransport); 

router 
    .route('/findAllDrivers')
    .get(findAllDrivers); 

router 

    .route('/findAllUsers')
    .get(findAllUsers); 
router
       .route('/saveconducteur')
       .put(saveconducteur);

    
    export default router ;