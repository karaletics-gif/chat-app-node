const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
    sendMessage,
    getMessages
} = require('../controllers/chatController');

router.post('/send', auth, sendMessage);
router.get(
    '/messages/:userId',
    auth,
    getMessages
);

module.exports = router;