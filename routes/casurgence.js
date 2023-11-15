import express from 'express';
import { deleteOnce, getListeByLocation, saveCovoiturage, show } from '../controllers/Casurgence.js';

const router = express.Router(); 

router 
    .route('/saveCovoiturage')
    .post(saveCovoiturage); 

router
    .route('/')
    .get(show)

router
    .route('/:location')
    .get(getListeByLocation);

router  
    .route('/delete/:id')
    .delete(deleteOnce);



    export default router ;
