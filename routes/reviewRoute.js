const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/")
const reviewValidate = require('../utilities/review-validation')

router.get(
  "/add/:invId",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.buildAddReview)
)

router.post(
  "/add",
  utilities.checkLogin,
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  utilities.handleErrors(reviewController.addReview)
)

router.get(
  "/edit/:reviewId",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.buildEditReview)
)

router.post(
  "/update",
  utilities.checkLogin,
  reviewValidate.reviewRules(),
  reviewValidate.checkUpdateReviewData,
  utilities.handleErrors(reviewController.updateReview)
)

router.get(
  "/delete/:reviewId",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.buildDeleteReview)
)

router.post(
  "/delete",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.deleteReview)
)

module.exports = router