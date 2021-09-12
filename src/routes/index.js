import express from 'express';
const router = express.Router();

import user from './user.js';

router.get('/', (req, res) => {
  res.json({
    statusCode: 200,
    data: {},
    message: 'API is running...',
  });
});

router.use('/user', user);

export default router;
