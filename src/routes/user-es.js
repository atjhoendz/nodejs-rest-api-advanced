import express from 'express';
const router = express.Router();

import userESController from '../controllers/user-es.controller.js';

router.get('/', userESController.findWithQuery);
router.get('/:id', userESController.findOne);
router.post('/', userESController.create);
router.put('/:id', userESController.update);
router.delete('/:id', userESController.remove);

export default router;
