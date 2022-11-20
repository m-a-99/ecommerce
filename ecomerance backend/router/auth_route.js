const express = require('express')
const { post_login, post_sinup } = require('../controllers/auth_controller.js');
const { multer_parse_body } = require('../middle_wheres/multer_middlewhares.js');
const router=express.Router();

router.post("/login", multer_parse_body,post_login)
router.post("/signup", multer_parse_body, post_sinup)


module.exports = router