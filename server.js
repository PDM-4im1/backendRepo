import express from 'express'; 
import mongoose from 'mongoose';
import myMiddleware from './middlewares/middleware.js';
import Counter from './models/counter.js';
import morgan from 'morgan';
import CovoiturageRoutes from './routes/CovoiturageRoutes.js';
import MoyenDeTransportRoutes from './routes/MoyenDeTransportRoutes.js';
import colisRoutes from './routes/colis.js';
import userRoutes from './routes/user.js';
import blogRoutes from './routes/blog.js';


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'shareCommute'

mongoose
    .connect(`mongodb+srv://shareCommute:sharecommute123@cluster0.tnifzps.mongodb.net/${databaseName}`,)
    .then(() => {
        console.log(`connected to ${databaseName}`) 
       })
       .catch(err => {
        console.log(err);
      });

async function initializeCounter() {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'userId' },
      {},
      { upsert: true, new: true }
    );
    console.log('Counter initialized:', counter);
  } catch (error) {
    console.error('Error initializing counter:', error);
  }
}

app.use(myMiddleware);


app.use(express.json());
app.use(morgan('dev'));

app.use('/user',userRoutes);
app.use('/covoiturage',CovoiturageRoutes);
app.use('/moyenDeTransport',MoyenDeTransportRoutes);
app.use('/colis', colisRoutes);
app.use('/blog',blogRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });