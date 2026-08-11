import { Router } from 'express';
import newsController from '../../controllers/news.controller';

const router = Router();

router.get('/', (req, res) => newsController.getNews(req, res));
router.get('/:id', (req, res) => newsController.getNewsDetail(req, res));
router.post('/', (req, res) => newsController.createNews(req, res));
router.put('/:id', (req, res) => newsController.updateNews(req, res));
router.delete('/:id', (req, res) => newsController.deleteNews(req, res));

export default router;
