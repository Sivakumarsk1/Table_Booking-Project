const express = require('express');
const UserController = require('../controllers/UserController');
const UserAuth = require("../controllers/userAuth/Auth");
const router = express.Router();

// Define routes for users
router.get('/all-in-tbl', UserController.getTables); // GET /users
router.post('/bk-ant', UserController.postBooking)
// router.get('/:id', UserController.getUserById); // GET /users/:id
// router.post('/', UserController.createUser); // POST /users

router.get("/getBooking", UserController.getBooking);

router.get("/Frozen", UserController.FrozenData);
// Auth
router.post("/signup", UserAuth.signUp);
router.post("/signin", UserAuth.signin);
router.post("/user-reg-check", UserAuth.Check);

module.exports = router;
