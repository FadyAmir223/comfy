import express from 'express';
import { getTranslation } from './language.controller.js';
const languageRoute = express.Router();
languageRoute.get('/:page/:language', getTranslation);
export default languageRoute;
