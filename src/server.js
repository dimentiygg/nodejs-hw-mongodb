import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';

const { PORT = 3000 } = Number(process.env);

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((err, req, res) => {
    res.status(404).json({
      message: 'Not found',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT}`);
  });
};

export default setupServer;
