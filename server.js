import  express  from 'express';
import mongoose from 'mongoose';
import colisRoutes from './routes/colis.js';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'shareCommute'

mongoose
    .connect(`mongodb+srv://shareCommute:sharecommute123@cluster0.tnifzps.mongodb.net/${databaseName}`)
    .then(() => {
        console.log(`connected to ${databaseName}`) 
       })
       .catch(err => {
        console.log(err);
      });
      
      
app.use(express.json()); 
app.use(cors());
   
app.use('/colis', colisRoutes);
    

 app.listen(port, () => {
       console.log(`Serveur en cours d'exécution sur  http://localhost:${port}`);
     });
  