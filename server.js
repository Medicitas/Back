import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';

import userRoute from './app/routes/userRoute';
import adminRoute from './app/routes/adminRoute';
import appointmentRoute from './app/routes/appointmentRoute';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', adminRoute);
app.use('/api', appointmentRoute);



app.listen(env.port).on('listening', () => {
  console.log(`Api-rest corriendo en localhost:${env.port}`);
});


export default app;
