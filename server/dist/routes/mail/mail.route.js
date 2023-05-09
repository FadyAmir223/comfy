import express from 'express';
import { handleMailSend } from './mail.controller.js';
const imageRoute = express.Router();
imageRoute.get('/', handleMailSend);
export default imageRoute;
