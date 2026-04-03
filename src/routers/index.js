import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
console.log('contactsRouter:', contactsRouter); // Додайте це
const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
