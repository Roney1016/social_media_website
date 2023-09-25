const express = require('express');
const postApi = require('../../../controllers/api/v1/post_api')
const passport = require('passport');
const router =express.Router();

router.get('/',postApi.index);

router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy)

module.exports = router;