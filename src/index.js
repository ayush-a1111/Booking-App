import express from 'express';
import { ServerConfig, Logger } from './config/index.js';
import { router as apiRoutes } from './routes/index.js';

const app = express();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`APP is up and runing at PORT : ${ServerConfig.PORT}`);
    // Logger.info(`Successfully started the server`, {});
});
