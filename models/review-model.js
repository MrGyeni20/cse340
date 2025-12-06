const pool = require("../database/")

/* ***************************
 * Add new review
 * ************************** */
async function addReview(review_text, review_rating, inv_id, account_id) {
  try {
    const sql = `INSERT INTO reviews (review_text, review_rating, inv_id, account_id) 
                 VALUES ($1, $2, $3, $4) RETURNING *`
    return await pool.query(sql, [review_text, review_rating, inv_id, account_id])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 * Get all reviews for a vehicle
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const sql = `SELECT r.review_id, r.review_text, r.review_rating, r.review_date, 
                        r.account_id, a.account_firstname, a.account_lastname
                 FROM reviews r
                 JOIN account a ON r.account_id = a.account_id
                 WHERE r.inv_id = $1
                 ORDER BY r.review_date DESC`
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByInvId error: " + error)
    return []
  }
}

/* ***************************
 * Get review by review_id
 * ************************** */
async function getReviewById(review_id) {
  try {
    const sql = `SELECT * FROM reviews WHERE review_id = $1`
    const data = await pool.query(sql, [review_id])
    return data.rows[0]
  } catch (error) {
    console.error("getReviewById error: " + error)
  }
}

/* ***************************
 * Update review
 * ************************** */
async function updateReview(review_text, review_rating, review_id) {
  try {
    const sql = `UPDATE reviews 
                 SET review_text = $1, review_rating = $2 
                 WHERE review_id = $3 
                 RETURNING *`
    const data = await pool.query(sql, [review_text, review_rating, review_id])
    return data.rows[0]
  } catch (error) {
    console.error("updateReview error: " + error)
    return error.message
  }
}

/* ***************************
 * Delete review
 * ************************** */
async function deleteReview(review_id) {
  try {
    const sql = `DELETE FROM reviews WHERE review_id = $1`
    const data = await pool.query(sql, [review_id])
    return data
  } catch (error) {
    console.error("deleteReview error: " + error)
    return error.message
  }
}

/* ***************************
 * Get average rating for a vehicle
 * ************************** */
async function getAverageRating(inv_id) {
  try {
    const sql = `SELECT AVG(review_rating)::numeric(10,1) as avg_rating, 
                        COUNT(*) as review_count
                 FROM reviews 
                 WHERE inv_id = $1`
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getAverageRating error: " + error)
    return { avg_rating: 0, review_count: 0 }
  }
}

/* ***************************
 * Get reviews by account
 * ************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const sql = `SELECT r.review_id, r.review_text, r.review_rating, r.review_date,
                        i.inv_make, i.inv_model, i.inv_year
                 FROM reviews r
                 JOIN inventory i ON r.inv_id = i.inv_id
                 WHERE r.account_id = $1
                 ORDER BY r.review_date DESC`
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByAccountId error: " + error)
    return []
  }
}

module.exports = {
  addReview,
  getReviewsByInvId,
  getReviewById,
  updateReview,
  deleteReview,
  getAverageRating,
  getReviewsByAccountId
}