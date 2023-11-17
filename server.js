import  express  from 'express';
import mongoose from 'mongoose';
import colisRoutes from './routes/colis.js';

const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'shareCommute'

mongoose
    .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(() => {
        console.log(`connected to ${databaseName}`) 
       })
       .catch(err => {
        console.log(err);
      });
      
      
app.use(express.json()); 
   
app.use('/colis', colisRoutes);
    

 app.listen(port, () => {
       console.log(`Serveur <link>Express.js</link> en cours d'exécution sur le port ${port}`);
     });
  