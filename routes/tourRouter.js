const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');



// router.param('id',tourController.checkID)
// router.param('id', );

router.route('/top-5-cheapProducts').get(tourController.aliasTopTours, tourController.getTours); 

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

router
    .route('/')
    .get(tourController.getTours)
    .post(tourController.addTour);

module.exports = router;