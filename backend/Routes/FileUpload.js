const express = require("express");
const router = express.Router();

// import all handler function
const {localFileUpload , imageUpload , videoUpload , imageReducer , videoReducer} = require("../Controllers/fileUpload");


// write all routes for handler function
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/reducedImageUpload" , imageReducer);
router.post("/reducedVideoUpload" , videoReducer);
 
module.exports = router;