import express from 'express';
import { saveMoyenDeTransport,findAllMoyenDeTransport,findAllDrivers,findAllUsers,findAllCovoiturages,saveconducteur,editMoyenDeTransport,deleteMoyenDeTransport} from '../controllers/MoyendeTransportController.js';

const router = express.Router(); 

router 
    .route('/saveMoyenDeTransport')
    .put(saveMoyenDeTransport); 
router
    .route('/findAllCovoiturages')
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
router 
    .route('/editMoyenDeTransport/:id')
    .put(editMoyenDeTransport);

router
    .route('/deleteMoyenDeTransport/:id')
    .delete(deleteMoyenDeTransport);
    
    export default router ;