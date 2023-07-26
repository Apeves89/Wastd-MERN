const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const multer = require('multer');
const upload = multer();
/*---------- Public Routes ----------*/

// whichever route is handling a file/photo upload, you use multer
// 'photo' comes from the key on the form-data object we created 
// on the signup page in the react code!
// POST /api/users/signup (create a user - sign up)
router.post("/signup", upload.single('photo'), usersCtrl.signup);
// POST /api/users/login
router.post("/login", usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// this is params for the api request coming from the react side
// /api/users/frenchacking
// /api/users/bobwier
// api/users/jimhaff
router.get('/:username', usersCtrl.profile);
module.exports = router;





