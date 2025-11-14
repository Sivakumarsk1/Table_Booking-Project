const express = require('express');
const UserController = require('../controllers/UserController');
const tb_cont = require('../controllers/TableController');
const ts_cont = require('../controllers/TimeslotController');
const fzn_cont =  require("../controllers/FrozenController")
const DashBord_cont = require("../controllers/dashbord/Dashbord");
const Reservations = require('../controllers/ReservationController');
const router = express.Router();
const Table = require('../models/Table');  // Import the Table model
const OfferController = require('../controllers/offerController');



// Define routes for admin
// Table Routes
router.post('/in-tbl', tb_cont.createTable);
router.get('/tbl-get', tb_cont.getTables);
router.put('/tbl-upd/:id', tb_cont.updateTable);
router.delete('/tbl-del/:id', tb_cont.deleteTable);

// router.post('/', UserController.createUser); // POST /users

// Time table Routes
router.post('/time-slots', ts_cont.createTimeslot) //post slots
router.get('/time-slots', ts_cont.getTimeslot) //post slots
router.put('/time-slots/:id', ts_cont.updateSlots) //post slots
router.delete('/time-slots/:id', ts_cont.deleteSlots);


// Frozen Data Routes
router.post('/froz-add', fzn_cont.AddFrozen);
router.get('/froz-get', fzn_cont.GetFrozen);
router.put('/froz-edit/:id', fzn_cont.UpdateFrozen);
router.delete('/froz-delete/:id', fzn_cont.DeleteFrozen);

router.get('/offers', OfferController.getOffers);
router.post('/offers', OfferController.createOffer);
router.get('/offers/user/:email', OfferController.getOffersByUser);



// Dashbord api's
router.get('/lst_bk', DashBord_cont.lstData)
router.get('/das_datums', DashBord_cont.dasDatums)




// Reservation page
router.get('/gd_bk_data', Reservations.getBookingData )
router.put('/update_booking', Reservations.update);
router.delete('/reservations/:id', Reservations.deleteReservation);






module.exports = router;
