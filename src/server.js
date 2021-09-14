import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import config from './utils/config.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan(`${config.isProd() ? 'combined' : 'dev'}`));
app.use('/api/v1/', router);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route not found...',
  });
});

export default app;
