import express from 'express';
import multer from 'multer';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, upload.single('image'), sendMessage);

export default router;




//old code reference.. //
// import express from 'express';
// import { sendMessage, getMessages } from '../controllers/message.controller.js';
// import protectRoute  from '../middleware/protectRoute.js'

// const router = express.Router();

// router.get("/:id", protectRoute, getMessages);
// router.post("/send/:id", protectRoute, sendMessage);

// export default router;