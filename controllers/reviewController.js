const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***************************
 * Build add review view
 * ************************** */
reviewCont.buildAddReview = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)
  const vehicle = await invModel.getInventoryByInvId(inv_id)
  let nav = await utilities.getNav()
  
  res.render("./reviews/add-review", {
    title: `Review ${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    errors: null,
    inv_id,
    vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
  })
}

/* ***************************
 * Process add review
 * ************************** */
reviewCont.addReview = async function (req, res) {
  let nav = await utilities.getNav()
  const { review_text, review_rating, inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  const addResult = await reviewModel.addReview(
    review_text,
    review_rating,
    inv_id,
    account_id
  )

  if (addResult) {
    req.flash("notice", "Thank you! Your review has been added.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, adding the review failed.")
    const vehicle = await invModel.getInventoryByInvId(inv_id)
    res.status(501).render("./reviews/add-review", {
      title: `Review ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      errors: null,
      review_text,
      review_rating,
      inv_id,
      vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
    })
  }
}

/* ***************************
 * Build edit review view
 * ************************** */
reviewCont.buildEditReview = async function (req, res, next) {
  const review_id = parseInt(req.params.reviewId)
  const review = await reviewModel.getReviewById(review_id)
  const vehicle = await invModel.getInventoryByInvId(review.inv_id)
  let nav = await utilities.getNav()
  
  res.render("./reviews/edit-review", {
    title: `Edit Review`,
    nav,
    errors: null,
    review_id: review.review_id,
    review_text: review.review_text,
    review_rating: review.review_rating,
    inv_id: review.inv_id,
    vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
  })
}

/* ***************************
 * Process review update
 * ************************** */
reviewCont.updateReview = async function (req, res) {
  let nav = await utilities.getNav()
  const { review_text, review_rating, review_id, inv_id } = req.body

  const updateResult = await reviewModel.updateReview(
    review_text,
    review_rating,
    review_id
  )

  if (updateResult) {
    req.flash("notice", "Your review has been updated.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, updating the review failed.")
    const vehicle = await invModel.getInventoryByInvId(inv_id)
    res.status(501).render("./reviews/edit-review", {
      title: "Edit Review",
      nav,
      errors: null,
      review_id,
      review_text,
      review_rating,
      inv_id,
      vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
    })
  }
}

/* ***************************
 * Build delete review confirmation
 * ************************** */
reviewCont.buildDeleteReview = async function (req, res, next) {
  const review_id = parseInt(req.params.reviewId)
  const review = await reviewModel.getReviewById(review_id)
  const vehicle = await invModel.getInventoryByInvId(review.inv_id)
  let nav = await utilities.getNav()
  
  res.render("./reviews/delete-review", {
    title: "Delete Review",
    nav,
    errors: null,
    review_id: review.review_id,
    review_text: review.review_text,
    review_rating: review.review_rating,
    inv_id: review.inv_id,
    vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
  })
}

/* ***************************
 * Process review deletion
 * ************************** */
reviewCont.deleteReview = async function (req, res) {
  let nav = await utilities.getNav()
  const { review_id, inv_id } = req.body

  const deleteResult = await reviewModel.deleteReview(review_id)

  if (deleteResult) {
    req.flash("notice", "Your review has been deleted.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, deleting the review failed.")
    res.redirect(`/review/delete/${review_id}`)
  }
}

module.exports = reviewCont