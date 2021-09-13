import express from 'express';
const router = express.Router();

import userController from '../controllers/user.controller.js';

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
