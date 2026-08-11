import { Router } from 'express';
import siteSettingController from '../../controllers/site_setting.controller';

const router = Router();

router.get('/', (req, res) => siteSettingController.getSettings(req, res));
router.put('/', (req, res) => siteSettingController.updateSettings(req, res));
router.post('/', (req, res) => siteSettingController.updateSettings(req, res));

export default router;
