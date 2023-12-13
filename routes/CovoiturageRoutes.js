import express from 'express';
import { deleteOnce, getListeByLocation, saveCovoiturage, show,editCovoiturage,getListeByType,getDetails } from '../controllers/CovoiturageController.js';

const router = express.Router(); 

router 
    .route('/saveCovoiturage')
    .post(saveCovoiturage); 

router
    .route('/')
    .get(show);

router
    .route('/Details/:id')
    .get(getDetails)

router
    .route('/:location')
    .get(getListeByLocation);

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