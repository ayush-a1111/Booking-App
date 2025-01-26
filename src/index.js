import express from 'express';
import { PORT } from './config/index.js';

const app = express();

app.listen(PORT,()=>{
    console.log(`APP is up and runing at PORT : ${PORT}`);
});
