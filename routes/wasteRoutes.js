const express = require('express');
const router = express.Router();
const controller = require('../controllers/wasteController');

router.post('/', controller.createWasteRequest);
router.get('/', controller.getAllRequests);
router.put('/:id', controller.updateRequestStatus);
router.delete('/:id', controller.deleteRequest);

module.exports = router;