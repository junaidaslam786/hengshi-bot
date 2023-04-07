import express from 'express';
import { getUpdates, receiveFacebookUpdate, receiveInstagramUpdate, verifySubscription } from "../controllers/facebookController.js";

const router = express.Router();

// Route to create a new response
router.get('/', getUpdates);

router.get(['/facebook', '/instagram'], verifySubscription);

router.post('/facebook', receiveFacebookUpdate);

router.post('/instagram', receiveInstagramUpdate);


export default router