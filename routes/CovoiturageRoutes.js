import express from 'express';
import { getListecovcond,findCovoiturageById,getLastCovoiturage,deleteOnce, getListeByLocation, saveCovoiturage, show,editCovoiturage,getListeByType,getDetails,findUserById,findMoyenDeTransportById, SendMailById } from '../controllers/CovoiturageController.js';

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
router
    .route('/findMoyenDeTransportById/:id')
    .get(findMoyenDeTransportById)

router
    .route('/LastCov')
    .get(getLastCovoiturage)

router
    .route('/findCovoiturage/:id')
    .get(findCovoiturageById)

router
.route("/SendMailById/:id/:covoiturage")
.get(SendMailById)

router
.route("/ConducteurCovoiturage/:type/:id_cond")
.get(getListecovcond)
 
export default router ;