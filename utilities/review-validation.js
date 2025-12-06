const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Review Data Validation Rules
 * ********************************* */
validate.reviewRules = () => {
  return [
    body("review_text")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 10, max: 500 })
      .withMessage("Review must be between 10 and 500 characters."),

    body("review_rating")
      .trim()
      .notEmpty()
      .isInt({ min: 1, max: 5 })
      .withMessage("Please select a rating from 1 to 5 stars."),
  ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkReviewData = async (req, res, next) => {
  const { review_text, review_rating, inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const vehicle = await invModel.getInventoryByInvId(inv_id)
    res.render("reviews/add-review", {
      errors,
      title: `Review ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      review_text,
      review_rating,
      inv_id,
      vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
    })
    return
  }
  next()
}

/* ******************************
 * Check update data and return errors or continue
 * ***************************** */
validate.checkUpdateReviewData = async (req, res, next) => {
  const { review_text, review_rating, review_id, inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const vehicle = await invModel.getInventoryByInvId(inv_id)
    res.render("reviews/edit-review", {
      errors,
      title: "Edit Review",
      nav,
      review_id,
      review_text,
      review_rating,
      inv_id,
      vehicle_name: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
    })
    return
  }
  next()
}

module.exports = validate