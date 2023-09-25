  // /api/v1/index.js

const express = require('express');



const router =express.Router();

router.use('/post',require('./post'))
router.use('/users',require('./users'))
module.exports = router;