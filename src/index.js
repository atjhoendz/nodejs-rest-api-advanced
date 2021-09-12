import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/api/v1/', router);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route not found...',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
