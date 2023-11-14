import express from 'express'; 
import mongoose from 'mongoose';
import myMiddleware from './middlewares/middleware.js';
import Counter from './models/counter.js';

import userRoutes from './routes/user.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'shareCommute'

mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`,)
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

app.use('/user',userRoutes);



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });