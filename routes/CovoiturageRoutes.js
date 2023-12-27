import express from 'express';
import { deleteOnce,findConducteurById,findAllCovoituragesClient,getListeByLocation, saveCovoiturage, show,editCovoiturage,getListeByType,getDetails,findUserById,findMoyenDeTransportById } from '../controllers/CovoiturageController.js';

const router = express.Router(); 

router 
    .route('/saveCovoiturage')
    .post(saveCovoiturage); 

router
    .route('/')
    .get(show);
    router
    .route('/findAllCovoituragesClient')
    .get(findAllCovoituragesClient);
    router
    .route('/findConducteurById/:id')
    .get(findConducteurById);

router
    .route('/Details/:id')
    .get(getDetails)



router
    .route('/finddriver/:localisation')
    .get(getListeByLocation);

router
    .route('/findUser/:id')
    .get(findUserById);

router
    .route('/Type/:type')
    .get(getListeByType)
router  
    .route('/delete/:id')
    .delete(deleteOnce);
router
    .route('/edit/:id')
    .put(editCovoiturage);    
    export default router ;
router
    .route('/findMoyenDeTransportById/:id')
    .get(findMoyenDeTransportById)