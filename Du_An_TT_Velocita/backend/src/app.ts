import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import { corsMiddleware } from './middlewares/cors.middleware';
import { errorHandlingMiddleware, notFoundMiddleware } from './middlewares/error.middleware';
import routerApi from './routes/api';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger & CORS Middleware
app.use(morgan('dev'));
app.use(corsMiddleware);

// Phục vụ các file tĩnh (ảnh upload, logo, media)
app.use(express.static('public'));

// Phân luồng API RESTful thuần túy (/api/v1/...)
app.use('/api', routerApi);

// Xử lý lỗi 404 & Error Handling tập trung
app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`🚀 RESTful API Server đang chạy tại: http://localhost:${port}/api`);
});

export default app;
