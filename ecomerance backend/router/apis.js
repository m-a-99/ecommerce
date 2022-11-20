const express = require('express');

const { getProducts_api, getShops_api, getprofile_api, getUserInfo_api, updateprofile_img_firstname_lastname_email_bio_api, file_api, add_contact_api, delete_contact_api, add_address_api, delete_address_api, change_password_api, getOrders_api } = require('../controllers/api_controller');
const { cookie_check_auth } = require('../middle_wheres/cookie_check_auth');
const { file_access } = require('../middle_wheres/file_access');
const { header_check_auth } = require('../middle_wheres/header_check_auth');
const { updateprofile_img_firstname_lastname_email_bio_api_middlewhare, multer_parse_body } = require('../middle_wheres/multer_middlewhares');





let router= express.Router();

router.get("/getProducts", getProducts_api)
router.get("/getShops", getShops_api)

router.get("/profile", cookie_check_auth, getprofile_api)
router.get("/getUserInfo", cookie_check_auth, getUserInfo_api)



router.post("/updateprofile_img_firstname_lastname_email_bio", header_check_auth ,updateprofile_img_firstname_lastname_email_bio_api_middlewhare , updateprofile_img_firstname_lastname_email_bio_api)

// router.get("/file/:fileId", cookie_check_auth, file_access,file_api)
router.get("/file/:fileId", file_access,file_api)

router.post('/add_contact', header_check_auth, multer_parse_body, add_contact_api)
router.delete("/delete_contact", header_check_auth, multer_parse_body, delete_contact_api)
router.post('/add_address', header_check_auth, multer_parse_body, add_address_api)
router.delete("/delete_address", header_check_auth, multer_parse_body, delete_address_api)
router.post("/change_password", header_check_auth, multer_parse_body, change_password_api)
router.get("/getOrders", cookie_check_auth, getOrders_api)

module.exports = router; 