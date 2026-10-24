import { Router } from 'express';
import { AccountController } from '../controllers/account.controller.js';
import { authenticateApiKey } from '../middleware/auth.js';

const router = Router();

router.get('/', AccountController.getRoot);
router.get('/health', AccountController.getHealth);
router.get('/api/docs', AccountController.getDocs);

router.post('/start', AccountController.startSession);
router.post('/create', authenticateApiKey, AccountController.createAccount);
router.get('/status/:id', authenticateApiKey, AccountController.getStatus);

export default router;
